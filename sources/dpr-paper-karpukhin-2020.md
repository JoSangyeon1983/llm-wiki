# SOURCE: Dense Passage Retrieval for Open-Domain Question Answering

- source-id: dpr-paper-karpukhin-2020
- 유형: 논문 (EMNLP 2020)
- URL: https://arxiv.org/abs/2004.04906
- 저자: Vladimir Karpukhin, Barlas Oğuz, Sewon Min, Patrick Lewis, Ledell Wu,
  Sergey Edunov, Danqi Chen, Wen-tau Yih
- 발표: EMNLP 2020 (제출 2020-04-10)
- 수집일: 2026-06-01

> 아래는 abstract/arXiv 페이지에서 추출한 원문 사실. 불변(읽기 전용).

## 핵심 주장
- open-domain QA의 검색을 **dense 표현만으로** 실용적으로 구현 가능.
- 소수의 질문·passage로 학습한 단순 **dual-encoder** 프레임워크로 임베딩을 학습.

## 기술 접근
- **Dense vs Sparse**: TF-IDF/BM25 같은 키워드 기반 sparse 대신 학습된 dense 벡터 사용.
  어휘적으로 안 겹쳐도 의미 관계를 포착.
- **Dual-Encoder**: 질문용·passage용 별도 신경 인코더 2개. 각각 고정 크기 dense 임베딩
  생성 → 내적/코사인 유사도로 비교.
- **학습**: 소수 샘플로 contrastive 학습 (배치 내 다른 샘플을 negative로 활용 시사).

## 핵심 결과
- top-20 passage 검색 정확도에서 BM25 대비 **절대 9%~19%** 향상, 다수 QA 벤치마크 SOTA.
