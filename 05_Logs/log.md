# Log

> append-only. 최신 항목을 **아래**에 추가함. 과거 줄은 수정·삭제하지 않음.
> 포맷: `YYYY-MM-DD | <작업유형> | <대상> | <한 줄 설명>`
> 작업유형: INGEST · QUERY · CREATE · UPDATE · REVIEW · LINT · MAINT

2026-06-16 | MAINT | vault | 초기 골격 생성 (PARA 6폴더 + sources/README + 00_Index/MOC + log.md)
2026-06-16 | MAINT | CLAUDE.md | Karpathy 패턴 대조 후 4개 보강(entity 1급/overview/링크≥2/정기 lint) + MOC 섹션 추가
2026-06-16 | MAINT | CLAUDE.md | 검수 워크플로(§7) 신설 — 작성(Claude)→검수(Codex)→수정 교차검증 + 원칙9/REVIEW 로그유형 추가
2026-06-16 | MAINT | CLAUDE.md | §7 표준 보강(Codex 검수 반영) — 원본전달 필수+검수불가 판정, stable 승격 차단조건, 검수강도 3등급, 대상조건 일원화
2026-06-16 | MAINT | CLAUDE.md | §7 검수자 표기에서 모델 버전(GPT-5) 제거 → "독립 모델(Codex)" (stale 방지, §1 원칙9와 통일)
