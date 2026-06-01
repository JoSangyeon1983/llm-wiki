---
title: LLM Wiki
type: concept
status: draft
tags: [llm, knowledge-base, karpathy]
sources: [karpathy-llm-wiki-gist]
created: 2026-06-01
updated: 2026-06-01
---

# LLM Wiki

> LLM이 직접 유지하는, 수집 시점에 컴파일되어 복리로 축적되는 구조화 지식 베이스.

## 핵심 내용
- [[Andrej Karpathy]]가 2026년 4월 제안한 패턴임. (출처: karpathy-llm-wiki-gist)
- 원본을 질문마다 다시 읽는 [[RAG]]와 달리, **수집 시점에 지식을 위키로 컴파일**함.
- 시간이 지날수록 복리(compounding)로 축적됨.

## 동기
- 핵심 문제: "LLM이 매 질문마다 지식을 처음부터 다시 발견함."
- 위키 접근은 지식 축적을 **컴파일된 자산**으로 다룸 — 새 소스·질문마다 강화됨.
- 사람은 유지보수 부담으로 위키를 방치하나 LLM은 지치지 않음 → 요약·상호참조·
  일관성 검사 같은 기계적 작업을 위임 가능. 유지 비용이 0에 수렴함.

## 3-레이어 아키텍처
1. **Raw sources** — 사람이 큐레이션하는 불변 원본.
2. **Wiki** — LLM이 소유하는 마크다운 페이지(요약·엔티티·개념·상호참조).
3. **Schema** (예: `CLAUDE.md`) — 수집/유지/질의 규약.

## 워크플로
- **Ingest**: 소스를 읽고 핵심 추출 → 관련 페이지 연쇄 갱신 → 모순 표시 → log 기록.
- **Query**: MOC 검색 → 관련 페이지 읽기 → 인용과 함께 합성 → 좋은 답변은 환원.

## [[RAG]]와의 차이
| | RAG | LLM Wiki |
|---|---|---|
| 처리 시점 | 질의 시점 검색 | 수집 시점 사전 구조화 |
| 상태 | stateless | stateful(복리 축적) |
| 소스 취급 | 흩어진 조각 | 합성된 통합 지식 |

## 관련 문서
- [[RAG]]
- [[Andrej Karpathy]]

## 참고
- 원본 gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
