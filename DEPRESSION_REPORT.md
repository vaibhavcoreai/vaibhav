# Project 2: Depression Severity Prediction — Research Report

**Author:** Vaibhav Manaji  
**Status:** 2nd Year Data Science Student  
**Context:** Machine Learning in Psychometric Analysis  

---

## 1. Abstract
Depression is a multi-faceted mental health disorder requiring objective and scalable screening tools. This study investigates the application of supervised machine learning algorithms to predict depression severity levels based on the Patient Health Questionnaire (PHQ-9). Utilizing a synthetic dataset of 1,000 samples across 19 features—including demographic, lifestyle, and trauma history—four models were benchmarked: Logistic Regression, Gradient Boosting, SVM, and Decision Tree. Logistic Regression emerged as the most effective model, achieving a cross-validation accuracy of 0.7888 and an AUC of 0.806. The findings underscore the predictive power of PHQ-9 sub-scores and the significant impact of social isolation and past trauma on clinical severity.

## 2. Introduction
### 2.1 Background
Major Depressive Disorder (MDD) is a leading cause of disability worldwide. Traditional diagnosis relies heavily on clinical interviews, which are resource-intensive and often inaccessible in under-resourced regions like India.

### 2.2 PHQ-9 Overview
The PHQ-9 is a validated 9-item psychometric instrument used to screen, diagnose, and monitor depression. Each item is scored from 0 (not at all) to 3 (nearly every day). The total score (0–27) determines the severity class:
- **Minimal (< 5)**
- **Mild (5–9)**
- **Moderate (10–14)**
- **Severe (≥ 15)**

## 3. Literature Review
Recent literature indicates a shift toward "Digital Phenotyping," where lifestyle data (sleep, activity) is combined with psychometric tools. Studies have shown that while individual symptoms vary, patterns in sleep architecture and social engagement provide robust latent indicators of depressive states. Machine learning models, particularly ensemble methods, have demonstrated high sensitivity in distinguishing sub-clinical (Mild) from clinical (Moderate/Severe) cases.

## 4. Methodology
### 4.1 Data Architecture
- **Samples:** 1,000 (Synthetic/Psychometric-mimic)
- **Features (19 Total):**
    - **9 PHQ-9 Items:** (e.g., Anhedonia, Sleep disturbance, Suicidal ideation)
    - **Lifestyle:** Sleep hours, physical exercise, alcohol consumption, social isolation index.
    - **Demographic:** Age, gender, employment status.
    - **Clinical History:** Trauma history, family history of MDD.

### 4.2 Algorithm Selection
Four distinct architectures were selected to compare linear vs. non-linear decision boundaries:
1. **Logistic Regression:** Linear baseline for multi-class classification.
2. **Gradient Boosting:** Ensemble technique to capture complex non-linear feature interactions.
3. **Support Vector Machine (SVM):** High-dimensional boundary optimization using RBF kernel.
4. **Decision Tree:** Interpretable tree-based logic.

## 5. EDA Findings (Exploratory Data Analysis)
- **Feature Correlation:** The total PHQ-9 score showed the strongest positive correlation with the target class, as expected.
- **Lifestyle Impact:** Social isolation scores were significantly higher in "Moderate" and "Severe" classes.
- **Sleep Inversion:** An "inverted-U" relationship was observed where both extreme insomnia (< 4hrs) and hypersomnia (> 10hrs) were linked to higher depression severity.

## 6. Results
The models were evaluated using 5-fold cross-validation (CV) and a held-out test set.

| Model | CV Acc | Test Acc | AUC |
| :--- | :--- | :--- | :--- |
| **Logistic Regression ✅** | **0.7888** | **0.715** | **0.806** |
| Gradient Boosting | 0.735 | 0.700 | 0.789 |
| SVM | 0.681 | 0.675 | 0.776 |
| Decision Tree | 0.581 | 0.615 | 0.644 |

### 6.1 Performance Analysis
- **Confusion Matrix:** High precision for "Minimal" and "Mild" classes; however, "Moderate" cases were frequently misclassified as "Mild."
- **ROC Curves:** Logistic Regression maintained the most stable ROC curve across all classes, indicating robust class separation.

## 7. Discussion
### 7.1 The Imbalance Problem
The "Severe" class suffered from a significant lack of representation (Class Imbalance). This led to lower recall for critical high-severity cases. Future work should implement **SMOTE** (Synthetic Minority Over-sampling Technique) to balance the severity distribution.

### 7.2 Clinical Implications
The feature importance analysis for Gradient Boosting highlighted **Family History** and **Sleep Quality** as the top non-PHQ predictors. This suggests that even without a full questionnaire, secondary lifestyle data can provide a strong initial "vulnerability score."

## 8. Conclusion
Machine learning provides a scalable pathway for objective depression screening. While Logistic Regression proved highly effective for this dataset, the inclusion of more granular physiological data (e.g., heart rate variability) could further refine prediction accuracy. This project demonstrates the potential for ML-driven tools to assist clinicians in prioritizing high-risk patients.

## 9. References
1. Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9.
2. WHO Mental Health Atlas (2022).
3. Pedregosa et al. (2011). Scikit-learn: Machine Learning in Python.
