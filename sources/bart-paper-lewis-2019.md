# SOURCE: BART — Denoising Seq2Seq Pre-training

- source-id: bart-paper-lewis-2019
- 유형: 논문 (arXiv, 2019)
- URL: https://arxiv.org/abs/1910.13461
- 제목: BART: Denoising Sequence-to-Sequence Pre-training for Natural Language
  Generation, Translation, and Comprehension
- 저자: Mike Lewis, Yinhan Liu, Naman Goyal, Marjan Ghazvininejad,
  Abdelrahman Mohamed, Omer Levy, Ves Stoyanov, Luke Zettlemoyer
- 발표: 2019-10 (arXiv:1910.13461)
- 수집일: 2026-06-01

> 아래는 abstract/arXiv 페이지에서 추출한 원문 사실. 불변(읽기 전용).

## 핵심 주장
- seq2seq 모델 사전학습을 위한 **denoising autoencoder**. 입력 텍스트를 손상시킨 뒤
  원문을 복원하도록 학습.

## 아키텍처
- 표준 Transformer 기반 NMT 구성. **양방향 인코더 + 좌→우 디코더** 결합.
- "BERT(양방향 인코더)와 GPT(좌→우 디코더), 기타 사전학습 기법을 일반화한 것으로 볼 수 있음."

## Noising 변형
- 여러 손상 전략을 평가, 다음 둘 조합이 최적:
  1. 문장 순서 무작위 셔플
  2. text span을 **단일 mask 토큰**으로 치환하는 in-filling

## 핵심 결과
- GLUE·SQuAD에서 RoBERTa와 대등.
- 추상 요약·대화·QA에서 SOTA, 최대 **6 ROUGE** 향상.
- 타깃 언어 사전학습만으로 역번역 대비 **1.1 BLEU** 향상.
