#!/usr/bin/env node
// wiki_lint.mjs - LLM Wiki 정합성 자동 검증
// 사용법: node scripts/wiki_lint.mjs [--json]
//
// (kocca30 wiki_lint.mjs에서 포팅. 가운뎃점 검사 제거 — 이 위키는 가운뎃점·em-dash 허용.
//  링크 하한선·고아 검사 추가 — CONVENTIONS §1.6 / AGENTS §5 핵심 규칙.)
//
// 검증 항목:
//   1. 깨진 wikilink — [[파일명]]의 대상 파일이 실재하는지
//      severity: warning (CONVENTIONS §4 "링크 대상 문서가 아직 없어도 괜찮음 — 다음 stub 신호" 허용)
//   2. wikilink anchor 정합 — [[파일#anchor]]의 anchor가 헤딩 텍스트(또는 #^블록ID)와 일치하는지
//      severity: error (대상 파일은 있는데 anchor 매칭 안 됨 — 명백한 stale)
//   3. 링크 하한선 — 콘텐츠 페이지가 관련 페이지를 2개 미만으로 링크
//      severity: warning (CONVENTIONS §1.6 / §4 Wikilink 규칙)
//   4. 고아 페이지 — 콘텐츠 페이지가 어디서도 링크되지 않음 (inbound 0)
//      severity: warning (CONVENTIONS §1.6 고아 방지)
//
// exit code:
//   - 0: error 0건 (warning은 표시만 하고 통과)
//   - 1: error 1건 이상
//
// 링크 하한선·고아 검사 면제: README.md, 05_Logs/log.md, type:index/log 페이지,
//   스키마 파일(CLAUDE.md·AGENTS.md·CONVENTIONS.md). 인프라/색인 문서이기 때문.
//
// 검증 대상 외 (자동 검증의 본질적 한계):
//   - 본문 § 참조 stale: 자연어 본문에 § 표시가 녹아있어 라벨 경계 정확 검출이 NLP 수준 필요.
//     정책으로 보완: 절 라벨 변경 시 본문 grep 의무. 더 안전하려면 § 대신 wikilink anchor 사용.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');

// 스캔(검사) 제외 디렉토리. sources/는 불변 원본이라 검사하지 않되, 링크 대상 매칭용으로
// INDEX_INCLUDED_DIRS에서 인덱스에는 포함함.
const EXCLUDED_PATHS = new Set([
  '.claude',
  'node_modules',
  '.git',
  '.obsidian',
  'assets',
  'scripts',
  'sources',
]);

// 내용 검사(anchor/링크) 제외 — 이력 보존
const SKIP_CONTENT_CHECKS = new Set([
  '05_Logs/log.md',
]);

// 링크 하한선·고아 검사 면제하는 스키마/메타 파일
const META_FILES = new Set([
  'CLAUDE.md',
  'AGENTS.md',
  'CONVENTIONS.md',
]);

// EXCLUDED 영역의 .md도 link target 매칭용으로 인덱스에 포함
const INDEX_INCLUDED_DIRS = [
  'sources',
];

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');

function normRel(p) {
  return p.split('\\').join('/');
}

function collectMd(root, rel = '') {
  const out = [];
  const dirPath = rel ? join(root, rel) : root;
  let entries;
  try {
    entries = readdirSync(dirPath);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const relPath = rel ? `${rel}/${entry}` : entry;
    if (EXCLUDED_PATHS.has(relPath)) continue;
    const full = join(root, relPath);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      out.push(...collectMd(root, relPath));
    } else if (extname(entry) === '.md') {
      out.push(normRel(relPath));
    }
  }
  return out;
}

function frontmatterType(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  const fm = content.slice(3, end);
  const m = /^type:\s*(.+)$/m.exec(fm);
  if (!m) return null;
  // 첫 토큰만 (실제 콘텐츠 페이지는 단일 값, enum 나열은 메타 파일뿐이라 무해)
  return m[1].trim().split(/[\s|]+/)[0];
}

function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const m = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (m) {
      headings.push({ level: m[1].length, text: m[2].trim(), line: i + 1 });
    }
  }
  return headings;
}

function extractWikilinks(content) {
  const links = [];
  // [[파일명#anchor|별칭]] — | escape(\|)도 처리. ![[ ]] 임베드도 동일 매칭.
  const regex = /\[\[([^\[\]\|#]+?)(?:#([^\[\]\|]+?))?(?:\\?\|([^\[\]]+?))?\]\]/g;
  const lines = content.split('\n');
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^```/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const lineNoCode = line.replace(/`[^`]*`/g, '');
    let m;
    regex.lastIndex = 0;
    while ((m = regex.exec(lineNoCode)) !== null) {
      links.push({
        target: m[1].trim(),
        anchor: m[2] ? m[2].trim() : null,
        alias: m[3] ? m[3].trim() : null,
        line: i + 1,
      });
    }
  }
  return links;
}

function buildFileIndex(allMdFiles) {
  const index = new Map();
  for (const relPath of allMdFiles) {
    const name = basename(relPath, '.md');
    if (!index.has(name)) {
      index.set(name, relPath);
    }
  }
  // EXCLUDED 영역(sources 등)의 .md도 link target 매칭용으로 인덱스에 포함
  for (const inclDir of INDEX_INCLUDED_DIRS) {
    const dirPath = join(REPO_ROOT, inclDir);
    let entries;
    try {
      entries = readdirSync(dirPath, { recursive: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const e = typeof entry === 'string' ? entry : entry.name;
      if (extname(e) === '.md') {
        const name = basename(e, '.md');
        if (!index.has(name)) {
          index.set(name, normRel(`${inclDir}/${e}`));
        }
      }
    }
  }
  return index;
}

function checkBrokenWikilinks(allMdFiles, fileIndex) {
  const findings = [];
  for (const relPath of allMdFiles) {
    if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const links = extractWikilinks(content);
    for (const link of links) {
      if (!fileIndex.has(link.target)) {
        findings.push({
          type: 'broken_wikilink',
          severity: 'warning',
          file: relPath,
          line: link.line,
          message: `[[${link.target}]] — 대상 파일 없음 (미작성 stub link로 간주)`,
        });
      }
    }
  }
  return findings;
}

function checkWikilinkAnchors(allMdFiles, fileIndex) {
  const findings = [];
  const headingsCache = new Map();
  for (const relPath of allMdFiles) {
    if (SKIP_CONTENT_CHECKS.has(relPath)) continue;
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const links = extractWikilinks(content);
    for (const link of links) {
      if (!link.anchor) continue;
      const targetPath = fileIndex.get(link.target);
      if (!targetPath) continue;
      // 블록 ID anchor (#^id): 헤딩이 아니라 블록 참조 — 블록 ID 존재로 검증
      if (link.anchor.startsWith('^')) {
        const blockContent = readFileSync(join(REPO_ROOT, targetPath), 'utf8');
        const blockId = link.anchor.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const blockRe = new RegExp('\\^' + blockId + '\\s*$', 'm');
        if (!blockRe.test(blockContent)) {
          findings.push({
            type: 'broken_anchor',
            severity: 'error',
            file: relPath,
            line: link.line,
            message: `[[${link.target}#${link.anchor}]] — 블록 ID가 ${link.target}에 없음`,
          });
        }
        continue;
      }
      let targetHeadings;
      if (headingsCache.has(targetPath)) {
        targetHeadings = headingsCache.get(targetPath);
      } else {
        const targetContent = readFileSync(join(REPO_ROOT, targetPath), 'utf8');
        targetHeadings = extractHeadings(targetContent);
        headingsCache.set(targetPath, targetHeadings);
      }
      const matched = targetHeadings.some(h => h.text === link.anchor);
      if (!matched) {
        findings.push({
          type: 'broken_anchor',
          severity: 'error',
          file: relPath,
          line: link.line,
          message: `[[${link.target}#${link.anchor}]] — anchor가 ${link.target} 헤딩 텍스트와 매칭 안 됨`,
        });
      }
    }
  }
  return findings;
}

// 콘텐츠 페이지인지 — 링크 하한선·고아 검사 대상 여부
function isContentPage(relPath, type) {
  if (basename(relPath) === 'README.md') return false;
  if (META_FILES.has(relPath)) return false;
  if (SKIP_CONTENT_CHECKS.has(relPath)) return false;
  if (!type) return false;
  if (type === 'index' || type === 'log') return false;
  return true;
}

function checkLinkFloorAndOrphans(allMdFiles) {
  const findings = [];
  const pages = [];     // { relPath, name, type, outboundTargets:Set }
  const inbound = new Map(); // basename -> 이 페이지를 가리키는 다른 파일 수

  for (const relPath of allMdFiles) {
    const content = readFileSync(join(REPO_ROOT, relPath), 'utf8');
    const name = basename(relPath, '.md');
    const type = frontmatterType(content);
    const links = SKIP_CONTENT_CHECKS.has(relPath) ? [] : extractWikilinks(content);
    const outboundTargets = new Set();
    for (const link of links) {
      if (link.target === name) continue; // self-link 제외
      outboundTargets.add(link.target);
    }
    // inbound 집계 (모든 스캔 파일의 링크가 기여 — MOC/README가 링크하면 고아 아님)
    for (const target of outboundTargets) {
      inbound.set(target, (inbound.get(target) || 0) + 1);
    }
    pages.push({ relPath, name, type, outboundTargets });
  }

  for (const p of pages) {
    if (!isContentPage(p.relPath, p.type)) continue;
    if (p.outboundTargets.size < 2) {
      findings.push({
        type: 'link_floor',
        severity: 'warning',
        file: p.relPath,
        line: 1,
        message: `관련 링크 ${p.outboundTargets.size}개 — 최소 2개 필요 (CONVENTIONS §1.6 링크 하한선)`,
      });
    }
    if (!inbound.has(p.name)) {
      findings.push({
        type: 'orphan',
        severity: 'warning',
        file: p.relPath,
        line: 1,
        message: `고아 페이지 — 어디서도 [[${p.name}]]로 링크되지 않음 (CONVENTIONS §1.6)`,
      });
    }
  }
  return findings;
}

function main() {
  const allMdFiles = collectMd(REPO_ROOT);
  const fileIndex = buildFileIndex(allMdFiles);
  const findings = [
    ...checkBrokenWikilinks(allMdFiles, fileIndex),
    ...checkWikilinkAnchors(allMdFiles, fileIndex),
    ...checkLinkFloorAndOrphans(allMdFiles),
  ];
  const errors = findings.filter(f => f.severity === 'error');
  const warnings = findings.filter(f => f.severity === 'warning');
  if (JSON_OUT) {
    console.log(JSON.stringify({
      ok: errors.length === 0,
      errorCount: errors.length,
      warningCount: warnings.length,
      scanned: allMdFiles.length,
      findings,
    }, null, 2));
  } else {
    console.log(`Wiki lint — ${allMdFiles.length}개 .md 스캔`);
    if (findings.length === 0) {
      console.log('✓ 발견 0건');
    } else {
      console.log(`✗ error ${errors.length}건 / warning ${warnings.length}건\n`);
      const byType = {};
      for (const f of findings) {
        byType[f.type] = byType[f.type] || [];
        byType[f.type].push(f);
      }
      for (const type of Object.keys(byType)) {
        const sev = byType[type][0].severity;
        console.log(`[${type}] (${sev}) ${byType[type].length}건`);
        for (const f of byType[type]) {
          console.log(`  ${f.file}:${f.line} — ${f.message}`);
        }
        console.log('');
      }
    }
  }
  process.exit(errors.length === 0 ? 0 : 1);
}

main();
