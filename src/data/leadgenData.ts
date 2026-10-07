import { 
  LeadRecord, 
  ActionPriority,
  ModelBenchmark, 
  ImbalanceExperiment, 
  IndustryConversionProfile,
  DeepLearningEpochMetric,
  TabNetAttentionStep
} from '../types/leadgen';

export const BENCHMARK_MODELS: ModelBenchmark[] = [
  {
    id: 1,
    name: "Stacking Super-Ensemble (Meta-Learner Blending)",
    shortName: "Stacking Meta-Learner",
    family: "Super-Ensemble",
    accuracy: 0.894,
    cvAccuracy: 0.887,
    roc_auc: 0.916,
    pr_auc: 0.846,
    precision: 0.842,
    recall: 0.820,
    f1: 0.831,
    brier_score: 0.082,
    lift_10: 3.24,
    optimal_tau: 0.34,
    max_profit_crores: 40.25,
    max_profit_millions: 40.25,
    train_time_s: 48.0,
    latency_ms: 4.80,
    description: "Multi-paradigm meta-learner combining out-of-fold calibrated probability outputs from TabNet, Tuned XGBoost, CatBoost, and Deep Tabular ResNet with an ElasticNet Logistic Regression blender.",
    keyHyperparameters: "Meta: L2-Logistic (C=0.45); Base: XGBoost (depth=6) + TabNet (N_d=64) + CatBoost (depth=7) + ResNet"
  },
  {
    id: 2,
    name: "TabNet Classifier (Attentive Interpretable Tabular)",
    shortName: "TabNet Transformer",
    family: "Deep Learning",
    accuracy: 0.886,
    cvAccuracy: 0.881,
    roc_auc: 0.908,
    pr_auc: 0.835,
    precision: 0.830,
    recall: 0.812,
    f1: 0.821,
    brier_score: 0.086,
    lift_10: 3.16,
    optimal_tau: 0.33,
    max_profit_crores: 39.10,
    max_profit_millions: 39.10,
    train_time_s: 38.0,
    latency_ms: 2.40,
    description: "End-to-end attentive tabular neural architecture employing sequential decision steps with Sparsemax attention masks for sparse feature selection and interpretability.",
    keyHyperparameters: "N_steps=3, N_d=64, N_a=64, gamma=1.3, lambda_sparse=1e-3, Mask_type='sparsemax', AdamW(lr=2e-2)"
  },
  {
    id: 3,
    name: "Tuned XGBoost (Histogram + Optuna Tuned)",
    shortName: "Tuned XGBoost",
    family: "Boosting",
    accuracy: 0.882,
    cvAccuracy: 0.7833,
    roc_auc: 0.898,
    pr_auc: 0.824,
    precision: 0.825,
    recall: 0.800,
    f1: 0.812,
    brier_score: 0.091,
    lift_10: 3.08,
    optimal_tau: 0.33,
    max_profit_crores: 38.80,
    max_profit_millions: 38.80,
    train_time_s: 3.20,
    latency_ms: 0.42,
    description: "Histogram gradient boosted decision trees with Optuna hyperparameter tuning and scale_pos_weight for conversion imbalance handling.",
    keyHyperparameters: "n_estimators=450, max_depth=6, learning_rate=0.04, subsample=0.85, colsample_bytree=0.8, reg_alpha=0.5, reg_lambda=1.2"
  },
  {
    id: 4,
    name: "FT-Transformer (Feature Tokenizer Tabular)",
    shortName: "FT-Transformer",
    family: "Deep Learning",
    accuracy: 0.881,
    cvAccuracy: 0.876,
    roc_auc: 0.902,
    pr_auc: 0.828,
    precision: 0.822,
    recall: 0.805,
    f1: 0.813,
    brier_score: 0.089,
    lift_10: 3.12,
    optimal_tau: 0.34,
    max_profit_crores: 38.40,
    max_profit_millions: 38.40,
    train_time_s: 42.0,
    latency_ms: 3.10,
    description: "Feature Tokenizer Transformer transforming continuous and categorical features into embeddings processed via multi-head self-attention blocks.",
    keyHyperparameters: "n_blocks=3, d_token=192, n_heads=8, ffn_d_hidden=256, attention_dropout=0.2, ffn_dropout=0.15"
  },
  {
    id: 5,
    name: "Tuned CatBoost Classifier (Ordered Boosting)",
    shortName: "Tuned CatBoost",
    family: "Boosting",
    accuracy: 0.879,
    cvAccuracy: 0.7823,
    roc_auc: 0.894,
    pr_auc: 0.819,
    precision: 0.818,
    recall: 0.795,
    f1: 0.806,
    brier_score: 0.094,
    lift_10: 3.02,
    optimal_tau: 0.34,
    max_profit_crores: 38.10,
    max_profit_millions: 38.10,
    train_time_s: 5.40,
    latency_ms: 0.65,
    description: "Ordered target encoding and symmetric tree architecture preventing target leakage on high-cardinality lead sources and referral domains.",
    keyHyperparameters: "iterations=600, depth=7, learning_rate=0.038, l2_leaf_reg=4.0, random_strength=0.8, border_count=128"
  },
  {
    id: 6,
    name: "LightGBM GBDT (Leaf-Wise Histogram)",
    shortName: "LightGBM GBDT",
    family: "Boosting",
    accuracy: 0.875,
    cvAccuracy: 0.7795,
    roc_auc: 0.891,
    pr_auc: 0.814,
    precision: 0.809,
    recall: 0.788,
    f1: 0.798,
    brier_score: 0.098,
    lift_10: 2.96,
    optimal_tau: 0.35,
    max_profit_crores: 37.50,
    max_profit_millions: 37.50,
    train_time_s: 1.80,
    latency_ms: 0.28,
    description: "Leaf-wise tree growth with gradient-based one-side sampling (GOSS), maximizing split depth along the steepest gradient descent paths.",
    keyHyperparameters: "num_leaves=63, max_depth=-1, learning_rate=0.045, min_child_samples=25, feature_fraction=0.85, bagging_fraction=0.8"
  },
  {
    id: 7,
    name: "PyTorch Tabular ResNet (Entity Embeddings)",
    shortName: "PyTorch Tabular ResNet",
    family: "Deep Learning",
    accuracy: 0.872,
    cvAccuracy: 0.868,
    roc_auc: 0.887,
    pr_auc: 0.816,
    precision: 0.805,
    recall: 0.796,
    f1: 0.800,
    brier_score: 0.100,
    lift_10: 2.94,
    optimal_tau: 0.33,
    max_profit_crores: 37.10,
    max_profit_millions: 37.10,
    train_time_s: 24.0,
    latency_ms: 1.80,
    description: "Deep ResNet architecture combining learned entity embeddings for categorical fields, BatchNorm, GELU activations, and Focal Loss (gamma=2.0).",
    keyHyperparameters: "Embed_dim=32, Hidden_dim=[256, 128], Skip_conn=True, Dropout=0.25, Focal_Loss(gamma=2.0, alpha=0.65), AdamW(lr=1e-3)"
  },
  {
    id: 8,
    name: "Clickstream 1D-CNN + BiLSTM (Engagement Path)",
    shortName: "Clickstream CNN-BiLSTM",
    family: "Deep Learning",
    accuracy: 0.866,
    cvAccuracy: 0.860,
    roc_auc: 0.882,
    pr_auc: 0.805,
    precision: 0.795,
    recall: 0.785,
    f1: 0.790,
    brier_score: 0.104,
    lift_10: 2.88,
    optimal_tau: 0.35,
    max_profit_crores: 36.40,
    max_profit_millions: 36.40,
    train_time_s: 34.0,
    latency_ms: 2.90,
    description: "Hybrid convolutional recurrent network modeling the sequential velocity of lead website visits, email opens, and touchpoint timelines.",
    keyHyperparameters: "Conv1D(filters=64, k=3) -> BiLSTM(hidden=64) -> Dense(32) -> Sigmoid, Sequence_length=15, Dropout=0.3"
  },
  {
    id: 9,
    name: "Tuned Random Forest (300 Trees, Balanced Subsample)",
    shortName: "Tuned Random Forest",
    family: "Tree / Ensemble",
    accuracy: 0.856,
    cvAccuracy: 0.7620,
    roc_auc: 0.872,
    pr_auc: 0.778,
    precision: 0.780,
    recall: 0.772,
    f1: 0.776,
    brier_score: 0.112,
    lift_10: 2.76,
    optimal_tau: 0.36,
    max_profit_crores: 35.20,
    max_profit_millions: 35.20,
    train_time_s: 8.50,
    latency_ms: 3.40,
    description: "Random Forest ensemble with balanced subsample bootstrapping to mitigate class imbalance, using Gini impurity criterion with min_samples_leaf=4.",
    keyHyperparameters: "n_estimators=300, max_features='sqrt', min_samples_split=6, min_samples_leaf=4, class_weight='balanced_subsample'"
  },
  {
    id: 10,
    name: "Extra Trees Classifier (Extremely Randomized)",
    shortName: "Extra Trees Classifier",
    family: "Tree / Ensemble",
    accuracy: 0.848,
    cvAccuracy: 0.7550,
    roc_auc: 0.865,
    pr_auc: 0.765,
    precision: 0.768,
    recall: 0.756,
    f1: 0.762,
    brier_score: 0.118,
    lift_10: 2.68,
    optimal_tau: 0.37,
    max_profit_crores: 34.10,
    max_profit_millions: 34.10,
    train_time_s: 6.20,
    latency_ms: 2.10,
    description: "Ensemble of completely randomized decision trees, trading minor bias increase for substantial variance reduction on noisy web engagement metrics.",
    keyHyperparameters: "n_estimators=250, max_depth=16, min_samples_split=5, class_weight='balanced'"
  },
  {
    id: 11,
    name: "Gradient Boosting Classifier (Scikit-Learn GBDT)",
    shortName: "Scikit GBDT",
    family: "Boosting",
    accuracy: 0.842,
    cvAccuracy: 0.7490,
    roc_auc: 0.858,
    pr_auc: 0.752,
    precision: 0.755,
    recall: 0.745,
    f1: 0.750,
    brier_score: 0.122,
    lift_10: 2.60,
    optimal_tau: 0.38,
    max_profit_crores: 33.20,
    max_profit_millions: 33.20,
    train_time_s: 7.80,
    latency_ms: 0.95,
    description: "Standard stagewise additive tree modeling minimizing binomial deviance loss over tabular continuous and encoded categorical features.",
    keyHyperparameters: "n_estimators=200, learning_rate=0.08, max_depth=4, subsample=0.85"
  },
  {
    id: 12,
    name: "Calibrated RBF Support Vector Machine (Platt Scaling)",
    shortName: "Calibrated RBF-SVM",
    family: "Linear",
    accuracy: 0.832,
    cvAccuracy: 0.7380,
    roc_auc: 0.846,
    pr_auc: 0.735,
    precision: 0.742,
    recall: 0.734,
    f1: 0.738,
    brier_score: 0.130,
    lift_10: 2.48,
    optimal_tau: 0.40,
    max_profit_crores: 32.00,
    max_profit_millions: 32.00,
    train_time_s: 19.5,
    latency_ms: 5.10,
    description: "Support Vector Classifier with radial basis function kernel, post-hoc calibrated using Sigmoidal Platt scaling to output well-calibrated probabilities.",
    keyHyperparameters: "C=1.8, gamma='scale', kernel='rbf', CalibratedClassifierCV(method='sigmoid', cv=5)"
  },
  {
    id: 13,
    name: "AdaBoost Classifier (SAMME Algorithm)",
    shortName: "AdaBoost SAMME",
    family: "Boosting",
    accuracy: 0.825,
    cvAccuracy: 0.7310,
    roc_auc: 0.838,
    pr_auc: 0.722,
    precision: 0.730,
    recall: 0.720,
    f1: 0.725,
    brier_score: 0.138,
    lift_10: 2.38,
    optimal_tau: 0.41,
    max_profit_crores: 30.80,
    max_profit_millions: 30.80,
    train_time_s: 3.80,
    latency_ms: 0.65,
    description: "Sequential boosting on shallow decision stumps, iteratively increasing sample weights for previously misclassified leads.",
    keyHyperparameters: "estimator=DecisionTreeClassifier(max_depth=2), n_estimators=150, learning_rate=0.1"
  },
  {
    id: 14,
    name: "Tuned ElasticNet Logistic Regression (L1/L2 SAGA)",
    shortName: "Tuned ElasticNet LogReg",
    family: "Linear",
    accuracy: 0.812,
    cvAccuracy: 0.7240,
    roc_auc: 0.835,
    pr_auc: 0.712,
    precision: 0.728,
    recall: 0.720,
    f1: 0.724,
    brier_score: 0.142,
    lift_10: 2.32,
    optimal_tau: 0.42,
    max_profit_crores: 29.50,
    max_profit_millions: 29.50,
    train_time_s: 1.10,
    latency_ms: 0.08,
    description: "Regularized logistic regression with balanced ElasticNet mixing (l1_ratio=0.4) solved via SAGA solver for sparse feature selection.",
    keyHyperparameters: "penalty='elasticnet', solver='saga', l1_ratio=0.4, C=0.35, max_iter=1000, class_weight='balanced'"
  }
];

export const IMBALANCE_EXPERIMENTS: ImbalanceExperiment[] = [
  {
    method: "1. Baseline (Raw Unbalanced Class Dist)",
    technique: "Standard Binary Cross-Entropy without weighting (38% positive / 62% negative ratio)",
    accuracy: 0.841,
    precision: 0.812,
    recall: 0.682,
    f1: 0.741,
    pr_auc: 0.765,
    roc_auc: 0.852,
    notes: "Suffers from low recall on high-value enterprise leads; yields only ₹28.5 Cr total net pipeline revenue."
  },
  {
    method: "2. Cost-Weighted Class Weighting",
    technique: "class_weight='balanced' inversely proportional to class frequencies in sample",
    accuracy: 0.858,
    precision: 0.778,
    recall: 0.794,
    f1: 0.786,
    pr_auc: 0.804,
    roc_auc: 0.871,
    notes: "Lifts recall from 68.2% to 79.4% (+11.2% absolute gain), capturing an additional ₹4.2 Cr in qualified enterprise deals."
  },
  {
    method: "3. SMOTE (Synthetic Minority Oversampling)",
    technique: "Synthetic k-nearest-neighbors manifold interpolation in continuous latent space (k=5)",
    accuracy: 0.872,
    precision: 0.805,
    recall: 0.815,
    f1: 0.810,
    pr_auc: 0.822,
    roc_auc: 0.886,
    notes: "Generates realistic synthetic positive leads; smooths decision boundaries around high-intent visits."
  },
  {
    method: "4. PyTorch Focal Loss (gamma=2.0, alpha=0.65)",
    technique: "Dynamically modulates gradient loss FL(pt) = -alpha(1-pt)^gamma log(pt) to down-weight easy negative instances",
    accuracy: 0.886,
    precision: 0.835,
    recall: 0.832,
    f1: 0.833,
    pr_auc: 0.838,
    roc_auc: 0.904,
    notes: "Superior gradient focus on hard borderline prospects (e.g. leads with 15+ visits but zero form submissions)."
  },
  {
    method: "5. Champion Stacking Ensemble + Cutoff (tau*=0.34)",
    technique: "Stacking Meta-Learner + Bayes-Optimal Economic Thresholding (₹15.4L ACV vs ₹15k SDR cost)",
    accuracy: 0.894,
    precision: 0.842,
    recall: 0.820,
    f1: 0.831,
    pr_auc: 0.846,
    roc_auc: 0.916,
    notes: "Top production configuration: yields highest overall accuracy (89.4%) and maximum net revenue (₹40.25 Cr)."
  }
];

export const INDUSTRY_PROFILES: IndustryConversionProfile[] = [
  {
    industry: "Enterprise SaaS",
    leadCount: 14200,
    avgConversionRate: 34.2,
    championUpliftRate: 46.8,
    avgContractValue: 2400000, // ₹24 Lakhs
    topConversionDriver: "Sandbox Demo engagement & API Docs depth (>8 mins)"
  },
  {
    industry: "FinTech & Banking",
    leadCount: 11800,
    avgConversionRate: 38.5,
    championUpliftRate: 51.2,
    avgContractValue: 3500000, // ₹35 Lakhs
    topConversionDriver: "C-Suite Role + SOC2/Compliance documentation download"
  },
  {
    industry: "Cloud & Cybersecurity",
    leadCount: 9400,
    avgConversionRate: 31.4,
    championUpliftRate: 43.6,
    avgContractValue: 3000000, // ₹30 Lakhs
    topConversionDriver: "Technical Architecture Whitepaper + Repeat return visits within 48h"
  },
  {
    industry: "HealthTech & Bio",
    leadCount: 7200,
    avgConversionRate: 26.8,
    championUpliftRate: 39.5,
    avgContractValue: 2600000, // ₹26 Lakhs
    topConversionDriver: "HIPAA integration validation & Discovery Call scheduled"
  },
  {
    industry: "PropTech & Real Estate",
    leadCount: 6500,
    avgConversionRate: 29.1,
    championUpliftRate: 41.0,
    avgContractValue: 2100000, // ₹21 Lakhs
    topConversionDriver: "Pricing Matrix calculation & multi-agent portfolio inquiry"
  },
  {
    industry: "E-Commerce & Retail",
    leadCount: 8900,
    avgConversionRate: 24.3,
    championUpliftRate: 36.2,
    avgContractValue: 1600000, // ₹16 Lakhs
    topConversionDriver: "Peak season volume calculator & live chat conversion"
  },
  {
    industry: "EduTech & EdServices",
    leadCount: 5400,
    avgConversionRate: 22.0,
    championUpliftRate: 33.5,
    avgContractValue: 1250000, // ₹12.5 Lakhs
    topConversionDriver: "Institutional LMS connector demo & semester pricing review"
  }
];

export const INITIAL_LEADS: LeadRecord[] = [
  {
    id: "LEAD-9014",
    prospectName: "Dr. Arvind Natarajan",
    company: "Apex Meridian Cloud Systems",
    leadOrigin: "Lead Add Form",
    leadSource: "LinkedIn InMail",
    industry: "Enterprise SaaS",
    occupation: "C-Suite / Executive",
    region: "India Tech Hubs",
    place: "Bengaluru, Karnataka (India Tech Hubs)",
    totalVisits: 14,
    totalTimeSpent: 1680,
    pageViewsPerVisit: 6.8,
    activityScore: 92,
    highIntentAction: "Pricing Matrix Deep-Dive",
    lastActivity: "Attended Product Demo",
    leadQualityTag: "High Intent - Buying Signal",
    dealSizeTier: "Enterprise (₹40L+)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 2,
    predictedProbability: 0.942,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "Total Time on Platform (1680s)", contribution: +0.34, impact: "positive" },
      { feature: "Lead Quality Tag: High Intent", contribution: +0.28, impact: "positive" },
      { feature: "Attended Live Product Demo", contribution: +0.22, impact: "positive" },
      { feature: "C-Suite Executive Authority", contribution: +0.16, impact: "positive" }
    ],
    recommendedAction: "Schedule executive architectural alignment session with Principal Solution Architect within 4 business hours."
  },
  {
    id: "LEAD-9015",
    prospectName: "Sarah Jenkins",
    company: "Vanguard Global Capital",
    leadOrigin: "Landing Page Submission",
    leadSource: "Google Ads",
    industry: "FinTech & Banking",
    occupation: "VP / Director",
    region: "EMEA & UK",
    place: "London, Greater London (EMEA & UK)",
    totalVisits: 9,
    totalTimeSpent: 1140,
    pageViewsPerVisit: 5.2,
    activityScore: 84,
    highIntentAction: "Demo Sandbox Test",
    lastActivity: "Visited Pricing Matrix",
    leadQualityTag: "Budget Pre-Approved",
    dealSizeTier: "Enterprise (₹40L+)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 1,
    predictedProbability: 0.885,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "FinTech Sector + Budget Approved", contribution: +0.31, impact: "positive" },
      { feature: "Demo Sandbox Test Executed", contribution: +0.24, impact: "positive" },
      { feature: "1,140s Platform Engagement", contribution: +0.19, impact: "positive" },
      { feature: "Recent Activity (<24h)", contribution: +0.14, impact: "positive" }
    ],
    recommendedAction: "Dispatch customized RBI/FCA compliance binder alongside custom quote for enterprise multi-tenant cluster."
  },
  {
    id: "LEAD-9016",
    prospectName: "Vikramaditya Rao",
    company: "Kavach Cyber Defense Labs",
    leadOrigin: "Referral Program",
    leadSource: "Referral Sites",
    industry: "Cloud & Cybersecurity",
    occupation: "Senior Tech Lead / PM",
    region: "India Tech Hubs",
    place: "Hyderabad, Telangana (India Tech Hubs)",
    totalVisits: 11,
    totalTimeSpent: 1390,
    pageViewsPerVisit: 7.1,
    activityScore: 88,
    highIntentAction: "API Docs Exploration",
    lastActivity: "Had Discovery Phone Call",
    leadQualityTag: "High Intent - Buying Signal",
    dealSizeTier: "Mid-Market (₹12L - ₹40L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 3,
    predictedProbability: 0.864,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "Deep API Documentation Exploration", contribution: +0.29, impact: "positive" },
      { feature: "Direct Executive Referral", contribution: +0.25, impact: "positive" },
      { feature: "Successful Discovery Call", contribution: +0.18, impact: "positive" },
      { feature: "Activity Score: 88/100", contribution: +0.15, impact: "positive" }
    ],
    recommendedAction: "Provide developer trial API keys with 100k test credits and initiate technical proof-of-concept sprint."
  },
  {
    id: "LEAD-9017",
    prospectName: "Priya Sundaram",
    company: "IndoGen BioAnalytics",
    leadOrigin: "Organic Search",
    leadSource: "Direct Traffic",
    industry: "HealthTech & Bio",
    occupation: "Working Professional",
    region: "India Tech Hubs",
    place: "Chennai, Tamil Nadu (India Tech Hubs)",
    totalVisits: 5,
    totalTimeSpent: 620,
    pageViewsPerVisit: 3.4,
    activityScore: 58,
    highIntentAction: "Whitepaper Download",
    lastActivity: "Opened Campaign Email",
    leadQualityTag: "Evaluating Competitors",
    dealSizeTier: "Mid-Market (₹12L - ₹40L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 6,
    predictedProbability: 0.548,
    predictedClass: 1,
    scoreTier: "Warm Prospect",
    shapDrivers: [
      { feature: "Clinical Whitepaper Download", contribution: +0.18, impact: "positive" },
      { feature: "Organic Search Searcher", contribution: +0.12, impact: "positive" },
      { feature: "Competitor Comparison Activity", contribution: -0.15, impact: "negative" },
      { feature: "Moderate Time on Site (620s)", contribution: +0.08, impact: "positive" }
    ],
    recommendedAction: "Trigger tailored competitive battlecard highlighting HIPAA/DISHA data residency in Indian sovereign clouds."
  },
  {
    id: "LEAD-9018",
    prospectName: "Marcus Vance",
    company: "OmniLogistics Global",
    leadOrigin: "Paid Campaign / Ads",
    leadSource: "Google Ads",
    industry: "E-Commerce & Retail",
    occupation: "Consultant / Architect",
    region: "North America",
    place: "San Francisco, CA (North America)",
    totalVisits: 4,
    totalTimeSpent: 410,
    pageViewsPerVisit: 2.8,
    activityScore: 49,
    highIntentAction: "ROI Calculator Used",
    lastActivity: "Modified Form Data",
    leadQualityTag: "Needs Technical Nurturing",
    dealSizeTier: "Growth (₹4L - ₹12L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 8,
    predictedProbability: 0.462,
    predictedClass: 1,
    scoreTier: "Warm Prospect",
    shapDrivers: [
      { feature: "ROI Calculator Interaction", contribution: +0.16, impact: "positive" },
      { feature: "Paid Search Origin", contribution: -0.06, impact: "negative" },
      { feature: "Time on Site < 500s", contribution: -0.12, impact: "negative" },
      { feature: "Consultant Engagement Profile", contribution: +0.07, impact: "positive" }
    ],
    recommendedAction: "Enroll in automated email nurture workflow showcasing client case studies and ₹ ROI benchmarks."
  },
  {
    id: "LEAD-9019",
    prospectName: "Kunal Mehra",
    company: "PropNex Horizon Realty",
    leadOrigin: "API",
    leadSource: "Partner Network",
    industry: "PropTech & Real Estate",
    occupation: "VP / Director",
    region: "India Tech Hubs",
    place: "Gurugram, Haryana (India Tech Hubs)",
    totalVisits: 8,
    totalTimeSpent: 980,
    pageViewsPerVisit: 4.6,
    activityScore: 76,
    highIntentAction: "Live Webinar Attended",
    lastActivity: "Attended Product Demo",
    leadQualityTag: "High Intent - Buying Signal",
    dealSizeTier: "Mid-Market (₹12L - ₹40L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 4,
    predictedProbability: 0.792,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "Attended Live Product Demo", contribution: +0.26, impact: "positive" },
      { feature: "Partner Network Pipeline", contribution: +0.20, impact: "positive" },
      { feature: "Webinar Participation", contribution: +0.15, impact: "positive" },
      { feature: "VP Leadership Level", contribution: +0.12, impact: "positive" }
    ],
    recommendedAction: "Sales executive call to discuss RERA integration capabilities and customized broker seat volume discounts."
  },
  {
    id: "LEAD-9020",
    prospectName: "Aaliyah Patel",
    company: "EduSphere Learning Labs",
    leadOrigin: "Landing Page Submission",
    leadSource: "Organic Social",
    industry: "EduTech & EdServices",
    occupation: "Student / Career Transition",
    region: "APAC Growth",
    place: "Singapore (APAC Growth)",
    totalVisits: 2,
    totalTimeSpent: 120,
    pageViewsPerVisit: 1.5,
    activityScore: 22,
    highIntentAction: "None",
    lastActivity: "Opened Campaign Email",
    leadQualityTag: "Low Intent / Student",
    dealSizeTier: "Starter (<₹4L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 19,
    predictedProbability: 0.118,
    predictedClass: 0,
    scoreTier: "Cold Lead",
    shapDrivers: [
      { feature: "Low Platform Time (120s)", contribution: -0.32, impact: "negative" },
      { feature: "Student / Transition Profile", contribution: -0.28, impact: "negative" },
      { feature: "Zero High-Intent Actions", contribution: -0.19, impact: "negative" },
      { feature: "19 Days Recency Decay", contribution: -0.14, impact: "negative" }
    ],
    recommendedAction: "Route to automated self-service free tier nurture; do NOT route to sales reps to conserve SDR capacity."
  },
  {
    id: "LEAD-9021",
    prospectName: "Thomas Wright",
    company: "Apex Retail Solutions",
    leadOrigin: "Outbound SDR",
    leadSource: "Email Marketing",
    industry: "E-Commerce & Retail",
    occupation: "Senior Tech Lead / PM",
    region: "EMEA & UK",
    place: "Dublin, Leinster (EMEA & UK)",
    totalVisits: 1,
    totalTimeSpent: 45,
    pageViewsPerVisit: 1.0,
    activityScore: 15,
    highIntentAction: "None",
    lastActivity: "Unsubscribed",
    leadQualityTag: "Ringing / No Answer",
    dealSizeTier: "Starter (<₹4L)",
    doNotEmail: true,
    doNotCall: true,
    recencyDays: 24,
    predictedProbability: 0.034,
    predictedClass: 0,
    scoreTier: "Cold Lead",
    shapDrivers: [
      { feature: "Do Not Email / Unsubscribed", contribution: -0.45, impact: "negative" },
      { feature: "Single Visit / 45s Total", contribution: -0.29, impact: "negative" },
      { feature: "Ringing / Unreachable Tag", contribution: -0.21, impact: "negative" },
      { feature: "24 Days Decay", contribution: -0.12, impact: "negative" }
    ],
    recommendedAction: "Mark status as Inactive / Opt-Out in CRM; suppress all outbound campaigns."
  },
  {
    id: "LEAD-9022",
    prospectName: "Rohit Deshmukh",
    company: "FinScale Payments Bharat",
    leadOrigin: "Lead Add Form",
    leadSource: "Welingak / Affiliate",
    industry: "FinTech & Banking",
    occupation: "C-Suite / Executive",
    region: "India Tech Hubs",
    place: "Mumbai, Maharashtra (India Tech Hubs)",
    totalVisits: 12,
    totalTimeSpent: 1540,
    pageViewsPerVisit: 6.2,
    activityScore: 95,
    highIntentAction: "Pricing Matrix Deep-Dive",
    lastActivity: "Attended Product Demo",
    leadQualityTag: "High Intent - Buying Signal",
    dealSizeTier: "Enterprise (₹40L+)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 1,
    predictedProbability: 0.938,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "Mumbai FinTech VIP Hub", contribution: +0.33, impact: "positive" },
      { feature: "C-Suite Authority", contribution: +0.27, impact: "positive" },
      { feature: "High Return Velocity (12 visits)", contribution: +0.22, impact: "positive" },
      { feature: "Pricing Matrix Evaluation", contribution: +0.16, impact: "positive" }
    ],
    recommendedAction: "Dispatch Enterprise Sales Director for in-person briefing at BKC Mumbai office with custom SLA agreement."
  },
  {
    id: "LEAD-9023",
    prospectName: "Ananya Kulkarni",
    company: "Cognitive Cloud Pune",
    leadOrigin: "Organic Search",
    leadSource: "Direct Traffic",
    industry: "Enterprise SaaS",
    occupation: "VP / Director",
    region: "India Tech Hubs",
    place: "Pune, Maharashtra (India Tech Hubs)",
    totalVisits: 7,
    totalTimeSpent: 890,
    pageViewsPerVisit: 4.8,
    activityScore: 78,
    highIntentAction: "Demo Sandbox Test",
    lastActivity: "Visited Pricing Matrix",
    leadQualityTag: "Budget Pre-Approved",
    dealSizeTier: "Mid-Market (₹12L - ₹40L)",
    doNotEmail: false,
    doNotCall: false,
    recencyDays: 3,
    predictedProbability: 0.815,
    predictedClass: 1,
    scoreTier: "Hot Lead",
    shapDrivers: [
      { feature: "Sandbox Testing Completed", contribution: +0.25, impact: "positive" },
      { feature: "Pune Tech Corridor Signal", contribution: +0.21, impact: "positive" },
      { feature: "Budget Pre-Approved Tag", contribution: +0.18, impact: "positive" },
      { feature: "VP Decision Authority", contribution: +0.14, impact: "positive" }
    ],
    recommendedAction: "Send customized technical integration roadmap and schedule 30-min discovery session."
  }
];

// -------------------------------------------------------------
// DEEP LEARNING TELEMETRY & EPOCH TRAINING DATA
// -------------------------------------------------------------
export const DEEP_LEARNING_EPOCHS_DATA: DeepLearningEpochMetric[] = [
  { epoch: 1, trainLossBCE: 0.692, trainLossFocal: 0.542, valLossBCE: 0.685, valLossFocal: 0.530, valAccuracy: 0.625, valRocAuc: 0.680, learningRate: 0.00100 },
  { epoch: 5, trainLossBCE: 0.545, trainLossFocal: 0.395, valLossBCE: 0.530, valLossFocal: 0.380, valAccuracy: 0.742, valRocAuc: 0.785, learningRate: 0.00098 },
  { epoch: 10, trainLossBCE: 0.435, trainLossFocal: 0.298, valLossBCE: 0.428, valLossFocal: 0.288, valAccuracy: 0.805, valRocAuc: 0.838, learningRate: 0.00095 },
  { epoch: 15, trainLossBCE: 0.365, trainLossFocal: 0.232, valLossBCE: 0.358, valLossFocal: 0.224, valAccuracy: 0.838, valRocAuc: 0.865, learningRate: 0.00090 },
  { epoch: 20, trainLossBCE: 0.315, trainLossFocal: 0.188, valLossBCE: 0.312, valLossFocal: 0.182, valAccuracy: 0.854, valRocAuc: 0.880, learningRate: 0.00084 },
  { epoch: 25, trainLossBCE: 0.282, trainLossFocal: 0.158, valLossBCE: 0.280, valLossFocal: 0.154, valAccuracy: 0.866, valRocAuc: 0.891, learningRate: 0.00076 },
  { epoch: 30, trainLossBCE: 0.258, trainLossFocal: 0.136, valLossBCE: 0.260, valLossFocal: 0.135, valAccuracy: 0.872, valRocAuc: 0.898, learningRate: 0.00067 },
  { epoch: 40, trainLossBCE: 0.228, trainLossFocal: 0.112, valLossBCE: 0.238, valLossFocal: 0.116, valAccuracy: 0.880, valRocAuc: 0.904, learningRate: 0.00048 },
  { epoch: 50, trainLossBCE: 0.208, trainLossFocal: 0.096, valLossBCE: 0.225, valLossFocal: 0.105, valAccuracy: 0.884, valRocAuc: 0.907, learningRate: 0.00032 },
  { epoch: 60, trainLossBCE: 0.192, trainLossFocal: 0.084, valLossBCE: 0.218, valLossFocal: 0.098, valAccuracy: 0.888, valRocAuc: 0.910, learningRate: 0.00018 },
  { epoch: 75, trainLossBCE: 0.176, trainLossFocal: 0.072, valLossBCE: 0.212, valLossFocal: 0.092, valAccuracy: 0.891, valRocAuc: 0.913, learningRate: 0.00007 },
  { epoch: 90, trainLossBCE: 0.165, trainLossFocal: 0.064, valLossBCE: 0.210, valLossFocal: 0.089, valAccuracy: 0.893, valRocAuc: 0.915, learningRate: 0.00002 },
  { epoch: 100, trainLossBCE: 0.158, trainLossFocal: 0.059, valLossBCE: 0.209, valLossFocal: 0.087, valAccuracy: 0.894, valRocAuc: 0.916, learningRate: 0.00001 }
];

export const TABNET_ATTENTION_STEPS: TabNetAttentionStep[] = [
  {
    step: 1,
    name: "Step 1: Session Depth & Intent Filter",
    description: "Focuses 68% of capacity on raw engagement duration and high-intent actions.",
    featureWeights: [
      { feature: "Total Time on Site (sec)", weight: 0.38 },
      { feature: "High Intent Action", weight: 0.24 },
      { feature: "Activity Score", weight: 0.18 },
      { feature: "Total Visits Count", weight: 0.12 },
      { feature: "Page Views per Visit", weight: 0.08 }
    ]
  },
  {
    step: 2,
    name: "Step 2: Commercial Authority & Deal Size",
    description: "Evaluates role seniority, budget pre-approvals, and corporate industry sector.",
    featureWeights: [
      { feature: "Prospect Role / Executive", weight: 0.34 },
      { feature: "Lead Quality Tag", weight: 0.28 },
      { feature: "Industry Sector Profile", weight: 0.20 },
      { feature: "Deal Size Tier (INR)", weight: 0.12 },
      { feature: "Lead Origin / Channel", weight: 0.06 }
    ]
  },
  {
    step: 3,
    name: "Step 3: Geographic Place & Recency Decay",
    description: "Fine-tunes probabilities based on tech hub location and recency velocity.",
    featureWeights: [
      { feature: "Place & Regional Hub", weight: 0.36 },
      { feature: "Recency Days Decay", weight: 0.30 },
      { feature: "Last Activity Type", weight: 0.20 },
      { feature: "Opt-Out Contact Flags", weight: 0.14 }
    ]
  }
];

export const ENTITY_EMBEDDING_POINTS = [
  { name: "Bengaluru, KA", x: 42, y: 78, category: "Tech Hub", cluster: "Tier-1 High Intent", conversions: 46.8 },
  { name: "Mumbai, MH", x: 48, y: 72, category: "Tech Hub", cluster: "Tier-1 High Intent", conversions: 51.2 },
  { name: "Hyderabad, TS", x: 38, y: 65, category: "Tech Hub", cluster: "Tier-1 High Intent", conversions: 43.6 },
  { name: "Gurugram, HR", x: 44, y: 62, category: "Tech Hub", cluster: "Tier-1 High Intent", conversions: 41.0 },
  { name: "Pune, MH", x: 36, y: 58, category: "Tech Hub", cluster: "Tier-1 High Intent", conversions: 39.5 },
  { name: "San Francisco, CA", x: 82, y: 85, category: "Global Hub", cluster: "Global Enterprise", conversions: 48.2 },
  { name: "London, UK", x: 74, y: 79, category: "Global Hub", cluster: "Global Enterprise", conversions: 44.5 },
  { name: "Singapore, SG", x: 68, y: 70, category: "Global Hub", cluster: "Global Enterprise", conversions: 42.0 },
  { name: "Enterprise SaaS", x: 55, y: 88, category: "Industry", cluster: "High LTV", conversions: 46.8 },
  { name: "FinTech & Banking", x: 62, y: 92, category: "Industry", cluster: "High LTV", conversions: 51.2 },
  { name: "Cybersecurity", x: 50, y: 82, category: "Industry", cluster: "High LTV", conversions: 43.6 },
  { name: "HealthTech", x: 32, y: 45, category: "Industry", cluster: "Mid LTV", conversions: 39.5 },
  { name: "PropTech", x: 35, y: 50, category: "Industry", cluster: "Mid LTV", conversions: 41.0 },
  { name: "E-Commerce", x: 22, y: 32, category: "Industry", cluster: "Low LTV", conversions: 36.2 },
  { name: "EduTech", x: 18, y: 25, category: "Industry", cluster: "Low LTV", conversions: 33.5 }
];

export const REGIONAL_CITY_METRICS = [
  { place: "Bengaluru, Karnataka", region: "India Tech Hubs", leadCount: 4800, conversionRate: 27.8, baselineRate: 16.4, uplift: 69.5, avgTicketLakhs: 28.5, totalProfitCrores: 14.85 },
  { place: "Mumbai, Maharashtra", region: "India Tech Hubs", leadCount: 4200, conversionRate: 25.1, baselineRate: 14.8, uplift: 69.6, avgTicketLakhs: 38.0, totalProfitCrores: 15.90 },
  { place: "Delhi-NCR (Gurugram)", region: "India Tech Hubs", leadCount: 3900, conversionRate: 24.9, baselineRate: 15.2, uplift: 63.8, avgTicketLakhs: 26.5, totalProfitCrores: 11.20 },
  { place: "Hyderabad, Telangana", region: "India Tech Hubs", leadCount: 3400, conversionRate: 24.2, baselineRate: 14.5, uplift: 66.9, avgTicketLakhs: 24.0, totalProfitCrores: 9.80 },
  { place: "Pune, Maharashtra", region: "India Tech Hubs", leadCount: 2900, conversionRate: 23.5, baselineRate: 14.1, uplift: 66.7, avgTicketLakhs: 21.5, totalProfitCrores: 7.60 },
  { place: "San Francisco, CA", region: "North America", leadCount: 3100, conversionRate: 28.4, baselineRate: 17.2, uplift: 65.1, avgTicketLakhs: 45.0, totalProfitCrores: 13.50 },
  { place: "London, UK", region: "EMEA & UK", leadCount: 2800, conversionRate: 26.2, baselineRate: 15.8, uplift: 65.8, avgTicketLakhs: 38.5, totalProfitCrores: 10.40 },
  { place: "Singapore", region: "APAC Growth", leadCount: 2100, conversionRate: 24.8, baselineRate: 15.0, uplift: 65.3, avgTicketLakhs: 32.0, totalProfitCrores: 7.10 }
];

// Helper: Calculate live lead conversion probability and SHAP attribution
export function calculateLiveLeadPrediction(lead: Partial<LeadRecord>): {
  probability: number;
  scoreTier: 'Hot Lead' | 'Warm Prospect' | 'Cold Lead';
  predictedClass: 0 | 1;
  shapDrivers: { feature: string; contribution: number; impact: 'positive' | 'negative' }[];
  recommendedAction: string;
} {
  // Base log-odds (intercept: -1.25, reflecting ~22% baseline before features)
  let logOdds = -1.25;
  const drivers: { feature: string; contribution: number; impact: 'positive' | 'negative' }[] = [];

  // 1. Time spent on website (continuous, log-scaled)
  const time = lead.totalTimeSpent || 0;
  if (time > 1200) {
    const boost = Math.min(1.45, 0.4 + (time - 1200) / 1000 * 0.8);
    logOdds += boost;
    drivers.push({ feature: `Time on Website (${time}s > 20m)`, contribution: +Math.round(boost * 100) / 100, impact: 'positive' });
  } else if (time > 500) {
    const boost = 0.35 + (time - 500) / 700 * 0.45;
    logOdds += boost;
    drivers.push({ feature: `Time on Website (${time}s)`, contribution: +Math.round(boost * 100) / 100, impact: 'positive' });
  } else if (time < 150) {
    const penalty = 0.65;
    logOdds -= penalty;
    drivers.push({ feature: `Short Session Time (${time}s)`, contribution: -penalty, impact: 'negative' });
  }

  // 2. Total Visits & Velocity
  const visits = lead.totalVisits || 1;
  if (visits >= 8) {
    const boost = 0.55;
    logOdds += boost;
    drivers.push({ feature: `High Return Velocity (${visits} visits)`, contribution: +boost, impact: 'positive' });
  } else if (visits >= 4) {
    const boost = 0.25;
    logOdds += boost;
    drivers.push({ feature: `Repeated Return Visits (${visits})`, contribution: +boost, impact: 'positive' });
  } else if (visits === 1) {
    const penalty = 0.20;
    logOdds -= penalty;
    drivers.push({ feature: `Single Session Only`, contribution: -penalty, impact: 'negative' });
  }

  // 3. Lead Origin
  switch (lead.leadOrigin) {
    case 'Lead Add Form':
      logOdds += 0.85;
      drivers.push({ feature: 'Origin: Direct Lead Add Form', contribution: +0.85, impact: 'positive' });
      break;
    case 'Referral Program':
      logOdds += 0.72;
      drivers.push({ feature: 'Origin: Direct Partner Referral', contribution: +0.72, impact: 'positive' });
      break;
    case 'API':
      logOdds += 0.45;
      drivers.push({ feature: 'Origin: API Integration Webhook', contribution: +0.45, impact: 'positive' });
      break;
    case 'Landing Page Submission':
      logOdds += 0.30;
      drivers.push({ feature: 'Origin: Landing Page Form', contribution: +0.30, impact: 'positive' });
      break;
    case 'Outbound SDR':
      logOdds -= 0.15;
      drivers.push({ feature: 'Origin: Cold Outbound SDR Campaign', contribution: -0.15, impact: 'negative' });
      break;
  }

  // 4. Lead Source
  switch (lead.leadSource) {
    case 'LinkedIn InMail':
      logOdds += 0.40;
      drivers.push({ feature: 'Source: LinkedIn B2B Decision-Maker', contribution: +0.40, impact: 'positive' });
      break;
    case 'Welingak / Affiliate':
      logOdds += 0.65;
      drivers.push({ feature: 'Source: Premium Partner / Affiliate', contribution: +0.65, impact: 'positive' });
      break;
    case 'Direct Traffic':
      logOdds += 0.28;
      drivers.push({ feature: 'Source: Direct Brand Recognition', contribution: +0.28, impact: 'positive' });
      break;
    case 'Organic Social':
      logOdds -= 0.22;
      drivers.push({ feature: 'Source: Organic Social Click', contribution: -0.22, impact: 'negative' });
      break;
  }

  // 5. Last Activity
  switch (lead.lastActivity) {
    case 'Attended Product Demo':
      logOdds += 0.95;
      drivers.push({ feature: 'Activity: Product Demo Completed', contribution: +0.95, impact: 'positive' });
      break;
    case 'Visited Pricing Matrix':
      logOdds += 0.68;
      drivers.push({ feature: 'Activity: Pricing Matrix Deep-Dive', contribution: +0.68, impact: 'positive' });
      break;
    case 'Had Discovery Phone Call':
      logOdds += 0.55;
      drivers.push({ feature: 'Activity: Successful Discovery Call', contribution: +0.55, impact: 'positive' });
      break;
    case 'Unsubscribed':
      logOdds -= 1.80;
      drivers.push({ feature: 'Activity: Opt-Out Unsubscribe Event', contribution: -1.80, impact: 'negative' });
      break;
  }

  // 6. Quality Tag
  switch (lead.leadQualityTag) {
    case 'High Intent - Buying Signal':
      logOdds += 1.10;
      drivers.push({ feature: 'Quality Tag: High Intent / Buying Signal', contribution: +1.10, impact: 'positive' });
      break;
    case 'Budget Pre-Approved':
      logOdds += 0.90;
      drivers.push({ feature: 'Quality Tag: Budget Pre-Approved', contribution: +0.90, impact: 'positive' });
      break;
    case 'Evaluating Competitors':
      logOdds += 0.15;
      drivers.push({ feature: 'Quality Tag: In Active Evaluation', contribution: +0.15, impact: 'positive' });
      break;
    case 'Low Intent / Student':
      logOdds -= 0.95;
      drivers.push({ feature: 'Quality Tag: Student / Academic Non-Buyer', contribution: -0.95, impact: 'negative' });
      break;
    case 'Ringing / No Answer':
      logOdds -= 0.60;
      drivers.push({ feature: 'Quality Tag: Repeated No-Answer', contribution: -0.60, impact: 'negative' });
      break;
  }

  // 7. Prospect Role
  switch (lead.occupation) {
    case 'C-Suite / Executive':
      logOdds += 0.50;
      drivers.push({ feature: 'Role: C-Suite / Executive Authority', contribution: +0.50, impact: 'positive' });
      break;
    case 'VP / Director':
      logOdds += 0.38;
      drivers.push({ feature: 'Role: VP / Director Decision Maker', contribution: +0.38, impact: 'positive' });
      break;
    case 'Student / Career Transition':
      logOdds -= 0.70;
      drivers.push({ feature: 'Role: Career Transition / Student', contribution: -0.70, impact: 'negative' });
      break;
  }

  // 8. Place / Regional Hub
  if (lead.place && lead.place.includes('Bengaluru')) {
    logOdds += 0.32;
    drivers.push({ feature: 'Location: Bengaluru IT Hub Corridor', contribution: +0.32, impact: 'positive' });
  } else if (lead.place && lead.place.includes('Mumbai')) {
    logOdds += 0.35;
    drivers.push({ feature: 'Location: Mumbai Financial Capital Hub', contribution: +0.35, impact: 'positive' });
  } else if (lead.place && lead.place.includes('Hyderabad')) {
    logOdds += 0.28;
    drivers.push({ feature: 'Location: Hyderabad HITEC City Hub', contribution: +0.28, impact: 'positive' });
  }

  // 9. Flags: Do Not Email / Call
  if (lead.doNotEmail || lead.doNotCall) {
    logOdds -= 1.40;
    drivers.push({ feature: 'Contact Preference: Do Not Contact Restriction', contribution: -1.40, impact: 'negative' });
  }

  // Sigmoid conversion
  const probability = 1 / (1 + Math.exp(-logOdds));
  const roundedProb = Math.round(probability * 1000) / 1000;

  let scoreTier: 'Hot Lead' | 'Warm Prospect' | 'Cold Lead' = 'Cold Lead';
  let recommendedAction = 'Maintain in automated educational nurture stream.';
  
  if (roundedProb >= 0.70) {
    scoreTier = 'Hot Lead';
    recommendedAction = 'Immediate SDR outbound call within 15 minutes; prioritize customized commercial proposal.';
  } else if (roundedProb >= 0.35) {
    scoreTier = 'Warm Prospect';
    recommendedAction = 'Dispatch personalized value-case study and invite to weekly group architecture demo.';
  }

  // Sort drivers by magnitude
  drivers.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  return {
    probability: roundedProb,
    scoreTier,
    predictedClass: roundedProb >= 0.34 ? 1 : 0, // optimal threshold tau* = 0.34
    shapDrivers: drivers.slice(0, 5),
    recommendedAction
  };
}

/**
 * Smart Auto-Tagging Utility:
 * Computes an 'Action Priority' label (Immediate, Nurture, Archived)
 * based on the lead's conversion probability and recent activity metrics.
 */
export function computeSmartActionPriority(lead: Partial<LeadRecord>): {
  priority: ActionPriority;
  reason: string;
  confidence: number;
  suggestedAction: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
} {
  const prob = lead.predictedProbability ?? 0.20;
  const time = lead.totalTimeSpent ?? 0;
  const visits = lead.totalVisits ?? 1;
  const recency = lead.recencyDays ?? 10;
  const activity = lead.lastActivity ?? 'Opened Campaign Email';
  const quality = lead.leadQualityTag ?? 'Needs Technical Nurturing';
  const isOptedOut = lead.doNotCall || lead.doNotEmail || activity === 'Unsubscribed';

  // 1. ARCHIVED (Disqualified, opted out, student, or stale dormant leads)
  if (isOptedOut || quality === 'Low Intent / Student' || (prob < 0.22 && recency > 18)) {
    return {
      priority: 'Archived',
      reason: isOptedOut 
        ? 'Explicit contact restriction (Do-Not-Contact flag or Unsubscribe event)'
        : quality === 'Low Intent / Student'
        ? 'Non-buyer academic persona (Student / Career Transition tag)'
        : `Dormant lead: low conversion probability (${(prob * 100).toFixed(0)}%) and inactive for ${recency} days`,
      confidence: 0.95,
      suggestedAction: 'Route to cold suppression list; cease active sales development calls',
      badgeBg: 'bg-slate-800/80',
      badgeText: 'text-slate-400',
      badgeBorder: 'border-slate-700'
    };
  }

  // 2. IMMEDIATE (Hot Leads: High conversion probability, recent demo/pricing views, or high velocity)
  if (
    prob >= 0.65 ||
    (prob >= 0.40 && (activity === 'Attended Product Demo' || activity === 'Visited Pricing Matrix') && recency <= 4) ||
    (quality === 'High Intent - Buying Signal' && recency <= 3) ||
    (time >= 1100 && visits >= 6 && recency <= 3)
  ) {
    const reason = prob >= 0.75 
      ? `High conversion probability (${(prob * 100).toFixed(0)}%) with decisive multi-touch buying velocity`
      : activity === 'Attended Product Demo'
      ? `Completed live product demo ${recency}d ago with ${(prob * 100).toFixed(0)}% probability`
      : activity === 'Visited Pricing Matrix'
      ? `Active buying signal: Pricing matrix deep-dive (${visits} visits, ${(prob * 100).toFixed(0)}% prob)`
      : `High intent digital footprint: ${time}s dwell time across ${visits} visits (${recency}d recency)`;

    return {
      priority: 'Immediate',
      reason,
      confidence: Math.min(0.98, Math.max(0.86, prob + 0.08)),
      suggestedAction: 'Outbound SLA < 15 mins: Dial prospect directly and dispatch customized proposal',
      badgeBg: 'bg-rose-950/80',
      badgeText: 'text-rose-300',
      badgeBorder: 'border-rose-700/70'
    };
  }

  // 3. NURTURE (Warm prospects requiring automated cadence or technical nurturing)
  return {
    priority: 'Nurture',
    reason: `Mid-funnel engagement (${(prob * 100).toFixed(0)}% prob, ${visits} visits, ${time}s dwell time) suitable for automated nurturing`,
    confidence: 0.88,
    suggestedAction: 'Enroll into automated email sequence; share relevant technical case studies & group demo',
    badgeBg: 'bg-amber-950/80',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-700/60'
  };
}
