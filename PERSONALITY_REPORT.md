# Project 3: Personality Type Prediction (Big Five / OCEAN) — Research Report

**Author:** Vaibhav Manaji  
**Status:** 2nd Year Data Science Student  
**Context:** Behavioral Analytics & Psychometric Modeling  

---

## 1. Abstract
Personality assessment is a cornerstone of behavioral science, with applications ranging from human resources to personalized digital experiences. This study utilizes the Big Five (OCEAN) framework to predict dominant personality traits using a dataset of 1,200 samples across 40+ features. The features include 25 Big Five Inventory (BFI) items and a variety of behavioral indicators such as social activity, risk-taking, and decision speed. Benchmarking revealed that Gaussian Naive Bayes outperformed more complex architectures, achieving a test accuracy of 85.8% and a near-perfect AUC of 0.984. The results indicate that personality structures in psychometric Likert-scale data exhibit a high degree of linear separability.

## 2. Introduction
### 2.1 The Big Five Theory
The Five-Factor Model (FFM), as defined by Costa & McCrae (1992), identifies five broad domains of human personality:
- **Openness (O):** Intellectual curiosity and creative imagination.
- **Conscientiousness (C):** Organization, persistence, and motivation.
- **Extraversion (E):** Sociability and outgoingness.
- **Agreeableness (A):** Compassion and cooperativeness.
- **Neuroticism (N):** Emotional instability and psychological distress.

## 3. Literature Review
Personality prediction has evolved from manual testing to automated screening using Natural Language Processing (NLP) and social media analytics. Research in HR technology frequently employs the Big Five model to predict job performance and cultural fit. While Deep Learning (DL) is increasingly common, classical statistical models remain the gold standard for psychometric data due to their high interpretability and efficiency on tabular Likert-scale inputs.

## 4. Methodology
### 4.1 Data Architecture & Feature Engineering
- **Samples:** 1,200
- **Primary Features (25):** Likert-scale (1–5) BFI items (5 per trait).
- **Derived Trait Totals:** O_total, C_total, E_total, A_total, N_total.
- **Behavioral Features:** 
    - Creativity Score, Risk-Taking Index, Social Activity frequency.
    - Goal-Setting behaviors, Empathy score, Emotional Reactivity.
    - Decision Speed (latency in psychometric response).

### 4.2 Algorithm Implementation
Four models were trained to evaluate different classification approaches:
1. **Naive Bayes (Gaussian):** A statistical baseline assuming feature independence.
2. **MLP Neural Network:** A deep learning approach (128→64→32 layers) with ReLU activation.
3. **Random Forest:** An ensemble method to capture non-linear trait interactions.
4. **K-Nearest Neighbors (KNN):** A proximity-based clustering approach.

## 5. EDA (Exploratory Data Analysis)
- **Trait Distribution:** A radar-style analysis showed that the "Agreeableness" and "Conscientiousness" traits exhibit the most overlap in the latent space.
- **Behavioral Correlation:** Social activity showed a strong positive correlation (+0.72) with Extraversion, while decision speed was negatively correlated with high Neuroticism.
- **Linear Separability:** Variance analysis indicated that the five personality clusters are highly distinct, explaining the high performance of simple models.

## 6. Results
| Model | CV Acc | Test Acc | AUC |
| :--- | :--- | :--- | :--- |
| **Naive Bayes ✅** | **0.862** | **0.858** | **0.984** |
| MLP Neural Network | 0.838 | 0.842 | 0.982 |
| Random Forest | 0.791 | 0.804 | 0.960 |
| KNN | 0.584 | 0.617 | 0.833 |

### 6.1 Performance Highlights
- **Highest Accuracy:** This project achieved the highest accuracy of all mental-health/psychometric benchmarks (85.8%).
- **Predictive Precision:** Extraversion was the most accurately predicted class (F1=0.88), while Conscientiousness was the most challenging (F1=0.80).

## 7. Discussion
### 7.1 Naive Bayes vs. Deep Learning
The superior performance of Naive Bayes (85.8%) over the MLP Neural Network (84.2%) supports findings in psychometric literature: Likert-scale data often satisfies Gaussian assumptions, allowing simpler statistical models to generalize better on small-to-medium datasets.

### 7.2 Behavioral vs. Psychometric Features
While BFI scores (E_total, N_total) were the top predictors, behavioral features like **Social Activity** and **Empathy Score** provided significant secondary lift, suggesting that objective behavioral tracking can effectively augment subjective self-reporting.

## 8. Conclusion
Personality prediction using the Big Five framework is highly effective when combining psychometric inventory scores with objective behavioral data. The success of the Gaussian Naive Bayes and MLP models demonstrates that even compact datasets can support high-precision behavioral classification, offering scalable tools for organizational and clinical psychology.

## 9. References
1. Costa, P. T., & McCrae, R. R. (1992). The Revised NEO Personality Inventory (NEO PI-R).
2. McCrae, R. R., & John, O. P. (1992). An introduction to the five-factor model.
3. Pedregosa et al. (2011). Scikit-learn: Machine Learning in Python.
