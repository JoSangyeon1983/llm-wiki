# Wiki Log

append-only. 최신 항목을 아래에 추가함. 포맷: `YYYY-MM-DD | <작업유형> | <대상> | <설명>`

2026-06-01 | MAINT | repo | LLM Wiki 초기 골격 구축 (CLAUDE.md, sources/, wiki/)
2026-06-01 | INGEST | karpathy-llm-wiki-gist | 원본 gist 수집 → [[LLM Wiki]] 생성, [[RAG]]/[[Andrej Karpathy]] stub 등록
2026-06-01 | MAINT | repo | CLAUDE.md 통합본 작성 (03 기반 + 02 규약 흡수, PARA 6폴더 유지)
2026-06-01 | MAINT | repo | PARA 구조로 마이그레이션 (wiki/ → 00_Index/01_Concepts/03_References/05_Logs), frontmatter·wikilink 갱신
2026-06-01 | INGEST | rag-paper-lewis-2020 | RAG 원 논문 수집 → [[RAG]] draft 보강(구성요소·정식화·한계), [[DPR]]/[[BART]] stub 링크 생성
2026-06-01 | INGEST | karpathy-wikipedia | Karpathy 위키 수집 → [[Andrej Karpathy]] draft 보강(학력·경력 타임라인·기여)
2026-06-01 | INGEST | dpr-paper-karpukhin-2020 | DPR 원 논문 수집 → [[DPR]] 페이지 생성(draft), MOC stub 해소
2026-06-01 | INGEST | bart-paper-lewis-2019 | BART 원 논문 수집 → [[BART]] 페이지 생성(draft), MOC stub 해소
2026-06-04 | INGEST | 쉬운 공문서 쓰기 길잡이(2022) | 공공언어 작성 원칙 컴파일 → WRITING_GUIDE.md 생성, CLAUDE.md §4에서 참조. 원본 PDF는 삭제 예정
2026-06-04 | MAINT | WRITING_GUIDE.md | 위키 문서 작성 지침 신설(스키마 레이어). 쉽게·읽는이 처지·정확하게 쓰기 3요건 + 작성3단계 + 검토 점검표
2026-06-04 | MAINT | sources/ | 컴파일 완료 후 원본 PDF "쉬운 공문서 쓰기 길잡이(2022)" 삭제(사용자 승인). provenance는 WRITING_GUIDE.md 근거 1줄로 대체
2026-06-04 | LINT | sources/README.md | 옛 경로 표기 수정(../wiki/ → PARA 폴더). PARA 마이그레이션 잔여 오류 정정
2026-06-05 | UPDATE | WRITING_GUIDE.md | §1 세 가지 요건 표 → 중첩 불릿으로 교체(셀 병합 흉내 제거, 요건→요소→점검질문 3단 계층 명시화)
2026-06-05 | LINT | WRITING_GUIDE.md | 제3자 관점 목적 적합성 점검 — 공문서 잔재·구조 불일치·LLM 핵심축 누락 5건 식별
2026-06-05 | UPDATE | WRITING_GUIDE.md | 점검 5건 반영: ①정확성에 '사실의 정확성'(출처·환각경계) 신설 ②§3 내용용이성을 §2 하위로 병합·섹션 재번호 ③고압적표현을 음슴체 위키용으로 재작성 ④ML 영문용어 예외 명시 ⑤도움받을곳 LLM용 재배치
2026-06-05 | LINT | CLAUDE.md, WRITING_GUIDE.md | 두 문서 역할 중복 점검 — 실질중복 3건(출처·불확실·환각)+문체 귀속 모호 식별
2026-06-05 | MAINT | CLAUDE.md, WRITING_GUIDE.md | 역할 분리(B안): CLAUDE=운영규약(시스템)·WRITING=쓰는법 정본. 문체(두괄/개조/음슴)를 CLAUDE §4→WRITING §2로 이관, 섹션 재번호(2~7), WRITING §5다(사실정확성)를 CLAUDE §4·§9 참조로 강등(SSOT)
