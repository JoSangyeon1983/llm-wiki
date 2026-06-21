# Log

> append-only. 최신 항목을 **위**에 추가함. 과거 줄은 수정·삭제하지 않음.
> 포맷:
> ```
> ## [YYYY-MM-DD] {작업유형} | {제목 또는 주제}
>
> - 작업 내용 요약
> - 생성/수정된 파일 목록
> - 새로 생성된 wikilink
> ```
> 작업유형: INGEST · QUERY · CREATE · UPDATE · REVIEW · LINT · MAINT

## [2026-06-22] MAINT | CLAUDE.md 3파일 분리 + wiki_lint 포팅 + H1 제거

- kocca30 패턴 이식: 단일 CLAUDE.md를 진입 스텁 + AGENTS.md(AI 운영) + CONVENTIONS.md(작성 표준)로 분리
- 개선: frontmatter type에 `index` 추가, 본문 H1 제목 제거(frontmatter title 단일 제목원), wikilink 섹션 anchor 형식 신설
- 보강: scripts/wiki_lint.mjs 포팅 — 가운뎃점 검사 제거(이 위키는 · 허용), 링크 하한선·고아 페이지 검사 추가
- 생성: AGENTS.md, CONVENTIONS.md, scripts/wiki_lint.mjs
- 수정: CLAUDE.md(스텁화), 00_Index/MOC.md(type:index, H1 제거, 스키마 문서 등록)
- 새 wikilink: [[AGENTS]], [[CONVENTIONS]]

## [2026-06-16] MAINT | §4 표현 형식 선택 기준표 신설

- §4에 표현 형식 선택 기준표(도표·1단계블릿·서브블릿·번호목록) 신설 + §7-A4 형식검수 연결, 캐치올 A1~A4 정합
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | sources 등록 보조장치 추가

- 등록 전 체크리스트(신뢰도·시의성·중복·포맷·라이선스·불변동결) + 엔트리 템플릿 추가
- 수정: sources/README.md
- 새 wikilink: 없음

## [2026-06-16] REVIEW | §7 2블록 분리안 Codex 독립검수 반영

- §4 concept 정의·§5 단계7 concept 정합, B항목별 판정 강제(탈출구 차단), 승격 캐치올 조항, stable 경량불가
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | §7 체크리스트 형식·의미 2블록 분리

- 의미검수 흡수 방지, 누락 판정 추가, concept 검수대상 포함, 두 블록 통과 승격조건
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | §7 검수자 표기에서 모델 버전 제거

- 모델 버전(GPT-5) 제거 → "독립 모델(Codex)" (stale 방지, §1 원칙9와 통일)
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | §7 표준 보강(Codex 검수 반영)

- 원본전달 필수+검수불가 판정, stable 승격 차단조건, 검수강도 3등급, 대상조건 일원화
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | 검수 워크플로(§7) 신설

- 작성(Claude)→검수(Codex)→수정 교차검증 워크플로 신설 + 원칙9/REVIEW 로그유형 추가
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | CLAUDE.md Karpathy 패턴 대조 보강

- 4개 보강(entity 1급/overview/링크≥2/정기 lint) + MOC 섹션 추가
- 수정: CLAUDE.md
- 새 wikilink: 없음

## [2026-06-16] MAINT | vault 초기 골격 생성

- PARA 6폴더 + sources/README + 00_Index/MOC + log.md 초기 골격 생성
- 생성: PARA 6폴더, sources/README.md, 00_Index/MOC, 05_Logs/log.md
- 새 wikilink: 없음
