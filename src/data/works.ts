export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  heroImage: string;
  tags: string[];
  tech: string[];
  features: string[];
  link: string;
  coordinates: string;
}

export const selectedWorks: WorkItem[] = [
  {
    id: '01',
    slug: 'stress-anxiety-detection',
    title: 'Stress & Anxiety Detection',
    client: 'ML Research',
    category: 'Mental Health ML',
    description: 'An objective machine learning approach to mental health screening, utilizing DASS-21 psychometric data and lifestyle indicators to classify stress severity.',
    longDescription: 'Stress and anxiety disorders represent a major public health concern, often going undiagnosed due to stigma and resource gaps. This project investigates the efficacy of machine learning in mental health screening. By analyzing patterns in psychometric scores and lifestyle data, we demonstrate a full ML pipeline—from Exploratory Data Analysis (EDA) to high-performance model evaluation—providing an objective indicator of anxiety severity.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef8b5655d939?q=80&w=2000&auto=format&fit=crop',
    tags: ['Logistic Regression', 'Random Forest', 'SVM', 'KNN'],
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'Seaborn'],
    features: ['DASS-21 Psychometric Modeling', '4-Class Severity Classification', 'Feature Importance Analysis', 'Full ML Pipeline Implementation'],
    link: 'https://github.com/vaibhavcoreai/stress-anxiety-ml',
    coordinates: '18.52.0 / 73.85.6'
  },
  {
    id: '02',
    slug: 'depression-severity-prediction',
    title: 'Depression Severity Prediction',
    client: 'Health Analytics',
    category: 'Psychometric ML',
    description: 'Classifying depression levels using PHQ-9 psychometric scores and lifestyle indicators. A comparative study of classification models for clinical monitoring.',
    longDescription: 'This research project focuses on predicting depression severity through the lens of the PHQ-9 questionnaire and demographic variables. Using a dataset of 1,000 samples with 19 features—including sleep patterns, trauma history, and social isolation—we built a multi-class classification system. The project specifically addresses clinical cutoffs ranging from "Minimal" to "Severe" (PHQ-9 ≥ 15), identifying Logistic Regression as the top performer with an AUC of 0.806.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    tags: ['Logistic Regression', 'Gradient Boosting', 'SVM', 'Decision Tree'],
    tech: ['Python', 'PHQ-9 Scoring', 'Classification Models', 'Data Science'],
    features: ['PHQ-9 Clinical Cutoff Modeling', 'Multi-Class Severity Prediction', 'AUC/F1-Score Model Comparison', 'Feature Importance Analysis (Sleep/Isolation)'],
    link: 'https://github.com/vaibhavcoreai/depression-prediction-ml',
    coordinates: '19.07.6 / 72.87.7'
  },
  {
    id: '03',
    slug: 'personality-type-prediction',
    title: 'Personality Type Prediction',
    client: 'Behavioral Science',
    category: 'Big Five / OCEAN',
    description: 'Predicting dominant personality traits from Big Five inventory scores and behavioral features. High-accuracy classification using Naive Bayes and Neural Networks.',
    longDescription: 'This research project implements the OCEAN framework (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) to classify dominant personality traits. Using a dataset of 1,200 samples with 40+ features—including Likert-scale inventory items and behavioral metrics like decision speed and social activity—we benchmarked several architectures. The study highlights the surprising effectiveness of Gaussian Naive Bayes, which achieved a test accuracy of 85.8% and an AUC of 0.984.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?q=80&w=2000&auto=format&fit=crop',
    tags: ['Naive Bayes', 'MLP Neural Network', 'Random Forest', 'KNN'],
    tech: ['Python', 'Scikit-Learn', 'PyTorch', 'OCEAN Theory'],
    features: ['Big Five Inventory (BFI) Modeling', 'Behavioral Trait Correlation', 'Neural Network (MLP) Implementation', 'Comparative Statistical Analysis'],
    link: 'https://github.com/vaibhavcoreai/personality-prediction-ml',
    coordinates: '18.52.0 / 73.85.6'
  }
];
