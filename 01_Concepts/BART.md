---
title: BART
type: concept
status: draft
tags: [seq2seq, pretraining, nlp]
sources: [bart-paper-lewis-2019]
created: 2026-06-01
updated: 2026-06-01
---

# BART

> 양방향 인코더 + 자기회귀 디코더를 결합한 denoising seq2seq 사전학습 모델. [[RAG]]의 generator.

## 핵심 내용
- seq2seq 사전학습용 **denoising autoencoder**. 입력을 손상시킨 뒤 원문을 복원하도록 학습.
  (출처: bart-paper-lewis-2019)
- [[RAG]]에서 "가져온 passage를 읽고 답을 쓰는" 생성기 역할.

## 아키텍처
- 표준 Transformer 기반. **양방향 인코더 + 좌→우(자기회귀) 디코더** 결합.
- BERT(양방향 인코더)와 GPT(좌→우 디코더)를 일반화한 것으로 볼 수 있음.
  (출처: bart-paper-lewis-2019)

## Noising 변형
- 다음 두 손상 전략 조합이 최적:
  1. 문장 순서 무작위 셔플
  2. text span을 **단일 mask 토큰**으로 치환하는 in-filling

## 핵심 결과
- GLUE·SQuAD에서 RoBERTa와 대등.
- 추상 요약·대화·QA에서 SOTA, 최대 **6 ROUGE** 향상. 역번역 대비 **1.1 BLEU** 향상.
  (출처: bart-paper-lewis-2019)

## 기원
- Mike Lewis 외, "BART: Denoising Seq2Seq Pre-training", 2019 (arXiv:1910.13461).
  1저자 Mike Lewis는 [[RAG]] 논문 공저자.

## 관련 문서
- [[RAG]]
- [[DPR]]

## 참고
- 원 논문: https://arxiv.org/abs/1910.13461
