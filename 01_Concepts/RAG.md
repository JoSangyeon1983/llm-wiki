---
title: RAG (Retrieval-Augmented Generation)
type: concept
status: draft
tags: [llm, retrieval, nlp]
sources: [karpathy-llm-wiki-gist, rag-paper-lewis-2020]
created: 2026-06-01
updated: 2026-06-01
---

# RAG (Retrieval-Augmented Generation)

> 질의 시점에 외부 지식을 검색해 LLM 응답에 결합하는 방식. parametric + non-parametric 메모리 결합.

## 핵심 내용
- **parametric memory**(학습된 모델 파라미터)와 **non-parametric memory**(외부
  지식베이스)를 결합함. (출처: rag-paper-lewis-2020)
- 사전학습 seq2seq 모델이 dense 벡터 인덱스를 neural retriever로 조회해 생성에 활용함.
- 검색된 사실에 응답을 grounding 하여 **환각(hallucination)** 을 완화함.
- 실무상 **stateless** — 각 질의가 독립적이고 지식이 누적되지 않음. [[LLM Wiki]]가
  대비점으로 제시하는 기존 패러다임임. (출처: karpathy-llm-wiki-gist)

## 기원
- Lewis 외, "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
  NeurIPS 2020 에서 제안됨. (출처: rag-paper-lewis-2020)
- open-domain QA 3개 과제에서 SOTA 달성, parametric-only baseline보다 더 구체적·
  다양·사실적인 언어를 생성함.

## 구성요소
- **Generator**: [[BART]] (seq2seq)
- **Retriever**: [[DPR]] (Dense Passage Retrieval)
- **지식원**: Wikipedia passages 의 dense 벡터 인덱스

## 두 가지 정식화
| 정식화 | 검색 passage 사용 방식 |
|--------|------------------------|
| **RAG-Sequence** | 출력 시퀀스 전체에 동일 passage 사용 |
| **RAG-Token** | 생성 토큰마다 다른 passage 사용 가능 |

## 한계
- stateless — 매 질의마다 검색·합성을 반복, 지식이 복리로 축적되지 않음.
- 검색 품질에 응답이 종속됨.

## 관련 문서
- [[LLM Wiki]]
- [[DPR]]
- [[BART]]

## 참고
- 원 논문: https://arxiv.org/abs/2005.11401
