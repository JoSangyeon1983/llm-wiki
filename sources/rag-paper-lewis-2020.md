# SOURCE: Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks

- source-id: rag-paper-lewis-2020
- 유형: 논문 (NeurIPS 2020)
- URL: https://arxiv.org/abs/2005.11401
- 저자: Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir
  Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih,
  Tim Rocktäschel, Sebastian Riedel, Douwe Kiela
- 발표: NeurIPS 2020 (제출 2020-05, 최종 수정 2021-04)
- 수집일: 2026-06-01

> 아래는 abstract/arXiv 페이지에서 추출한 원문 사실. 불변(읽기 전용).

## 핵심 주장
- LLM의 지식 접근·조작 한계를 다룸. **parametric memory**(학습된 파라미터)와
  **non-parametric memory**(외부 지식베이스)를 결합.
- 사전학습 seq2seq 모델이 dense Wikipedia 벡터 인덱스를 neural retriever로 조회.
- "RAG는 parametric-only seq2seq baseline보다 더 구체적·다양·사실적인 언어를 생성함."
- open-domain QA 3개 과제에서 SOTA 달성.

## 구성요소
- Generator: **BART**
- Retriever: **DPR** (Dense Passage Retrieval, 사전학습 neural retriever)
- 지식원: Wikipedia passages (dense vector index)

## 두 가지 정식화(formulation)
- **RAG-Sequence**: 출력 시퀀스 전체에 동일한 검색 passage를 사용.
- **RAG-Token**: 생성 토큰마다 다른 passage를 사용 가능.

## 의의
- 검색된 사실에 응답을 grounding 하여 지식 집약 과제의 **환각(hallucination)** 완화.
