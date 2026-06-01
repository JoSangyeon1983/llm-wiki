---
title: DPR (Dense Passage Retrieval)
type: concept
status: draft
tags: [retrieval, embedding, nlp]
sources: [dpr-paper-karpukhin-2020]
created: 2026-06-01
updated: 2026-06-01
---

# DPR (Dense Passage Retrieval)

> 질문·문서를 dense 벡터로 임베딩해 의미 기반으로 검색하는 dual-encoder 방식. [[RAG]]의 retriever.

## 핵심 내용
- open-domain QA 검색을 **dense 표현만으로** 실용화함. (출처: dpr-paper-karpukhin-2020)
- [[RAG]]에서 "무엇을 가져올지" 담당하는 검색기.

## Dense vs Sparse
- TF-IDF/BM25 같은 키워드 기반 **sparse** 검색과 대비됨.
- 학습된 dense 벡터를 써 어휘가 안 겹쳐도 **의미 관계**를 포착함. (출처: dpr-paper-karpukhin-2020)

## 아키텍처 (Dual-Encoder)
- 질문용·passage용 별도 인코더 2개. 각각 고정 크기 dense 임베딩 생성.
- 내적/코사인 유사도로 질문↔passage 매칭.
- 학습: 소수 샘플로 contrastive 학습 (배치 내 다른 샘플을 negative로 활용).

## 핵심 결과
- top-20 검색 정확도에서 BM25 대비 **절대 9%~19%** 향상, 다수 QA 벤치마크 SOTA.
  (출처: dpr-paper-karpukhin-2020)

## 기원
- Karpukhin 외, "Dense Passage Retrieval for Open-Domain QA", EMNLP 2020.
  저자진이 [[RAG]] 논문과 겹침(Karpukhin, P. Lewis, Yih 등).

## 관련 문서
- [[RAG]]
- [[BART]]

## 참고
- 원 논문: https://arxiv.org/abs/2004.04906
