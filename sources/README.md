# sources/ — Raw Sources (불변 레이어)

여기에는 위키의 **원본 자료**를 둔다. 사람이 큐레이션하며, LLM은 **읽기만** 한다.
(원본은 절대 수정하지 않는다. 가공/요약은 `../wiki/` 에서 이뤄진다.)

## 등록 규칙

- 각 소스는 고유한 **source-id** (kebab-case) 를 가진다. 예: `karpathy-llm-wiki-gist`.
- 파일을 직접 두거나(`karpathy-llm-wiki-gist.md`, `paper-2026.pdf`), 외부 링크면
  아래 표에 등록한다.
- 위키 페이지의 `sources:` frontmatter 와 본문 `(출처: source-id)` 가 이 id 를 참조한다.

## 소스 인덱스

| source-id | 제목 | 유형 | 위치/URL | 추가일 |
|-----------|------|------|----------|--------|
| karpathy-llm-wiki-gist | Karpathy — LLM Wiki (원본 gist) | web | https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f | 2026-06-01 |
| rag-paper-lewis-2020 | Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | paper | https://arxiv.org/abs/2005.11401 | 2026-06-01 |
| karpathy-wikipedia | Andrej Karpathy — Wikipedia | web | https://en.wikipedia.org/wiki/Andrej_Karpathy | 2026-06-01 |
| dpr-paper-karpukhin-2020 | Dense Passage Retrieval for Open-Domain QA | paper | https://arxiv.org/abs/2004.04906 | 2026-06-01 |
| bart-paper-lewis-2019 | BART: Denoising Seq2Seq Pre-training | paper | https://arxiv.org/abs/1910.13461 | 2026-06-01 |
