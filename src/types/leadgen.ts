export type LeadOrigin = 
  | 'API'
  | 'Landing Page Submission'
  | 'Lead Add Form'
  | 'Organic Search'
  | 'Paid Campaign / Ads'
  | 'Referral Program'
  | 'Outbound SDR';

export type LeadSource = 
  | 'Google Ads'
  | 'LinkedIn InMail'
  | 'Direct Traffic'
  | 'Referral Sites'
  | 'Email Marketing'
  | 'Welingak / Affiliate'
  | 'Organic Social'
  | 'Partner Network';

export type IndustrySector = 
  | 'Enterprise SaaS'
  | 'FinTech & Banking'
  | 'Cloud & Cybersecurity'
  | 'HealthTech & Bio'
  | 'PropTech & Real Estate'
  | 'E-Commerce & Retail'
  | 'EduTech & EdServices';

export type ProspectRole = 
  | 'C-Suite / Executive'
  | 'VP / Director'
  | 'Senior Tech Lead / PM'
  | 'Working Professional'
  | 'Consultant / Architect'
  | 'Student / Career Transition';

export type TerritoryRegion = 
  | 'North America'
  | 'EMEA & UK'
  | 'India Tech Hubs'
  | 'APAC Growth'
  | 'LATAM';

export type HighIntentAction = 
  | 'Pricing Matrix Deep-Dive'
  | 'Demo Sandbox Test'
  | 'Whitepaper Download'
  | 'API Docs Exploration'
  | 'Live Webinar Attended'
  | 'ROI Calculator Used'
  | 'None';

export type LastActivityType = 
  | 'Attended Product Demo'
  | 'Opened Campaign Email'
  | 'Visited Pricing Matrix'
  | 'Submitted Contact Form'
  | 'Had Discovery Phone Call'
  | 'Modified Form Data'
  | 'Unsubscribed';

export type LeadQualityTag = 
  | 'High Intent - Buying Signal'
  | 'Evaluating Competitors'
  | 'Budget Pre-Approved'
  | 'Needs Technical Nurturing'
  | 'Ringing / No Answer'
  | 'Low Intent / Student';

export type DealSizeTier = 
  | 'Enterprise (₹40L+)'
  | 'Mid-Market (₹12L - ₹40L)'
  | 'Growth (₹4L - ₹12L)'
  | 'Starter (<₹4L)';

export type ActionPriority = 'Immediate' | 'Nurture' | 'Archived';

export interface LeadRecord {
  id: string;
  prospectName: string;
  company: string;
  leadOrigin: LeadOrigin;
  leadSource: LeadSource;
  industry: IndustrySector;
  occupation: ProspectRole;
  region: TerritoryRegion;
  place: string; // Specific city and place name (e.g., Bengaluru, Karnataka)
  totalVisits: number;
  totalTimeSpent: number; // in seconds
  pageViewsPerVisit: number;
  activityScore: number; // 0 - 100
  highIntentAction: HighIntentAction;
  lastActivity: LastActivityType;
  leadQualityTag: LeadQualityTag;
  dealSizeTier: DealSizeTier;
  doNotEmail: boolean;
  doNotCall: boolean;
  recencyDays: number;
  predictedProbability: number;
  predictedClass: 0 | 1;
  scoreTier: 'Hot Lead' | 'Warm Prospect' | 'Cold Lead';
  actionPriority?: ActionPriority;
  actionPriorityReason?: string;
  shapDrivers: { feature: string; contribution: number; impact: 'positive' | 'negative' }[];
  recommendedAction: string;
}

export interface ModelBenchmark {
  id: number;
  name: string;
  shortName: string;
  family: 'Super-Ensemble' | 'Boosting' | 'Tree / Ensemble' | 'Deep Learning' | 'Linear';
  accuracy: number;
  cvAccuracy?: number;
  roc_auc: number;
  pr_auc: number;
  precision: number;
  recall: number;
  f1: number;
  brier_score: number;
  lift_10: number;
  optimal_tau: number;
  max_profit_crores: number; // in INR Crores (₹ Cr)
  max_profit_millions?: number; // legacy backward compatibility
  train_time_s: number;
  latency_ms: number;
  description: string;
  keyHyperparameters: string;
}

export interface DeepLearningEpochMetric {
  epoch: number;
  trainLossBCE: number;
  trainLossFocal: number;
  valLossBCE: number;
  valLossFocal: number;
  valAccuracy: number;
  valRocAuc: number;
  learningRate: number;
}

export interface TabNetAttentionStep {
  step: number;
  name: string;
  description: string;
  featureWeights: { feature: string; weight: number }[];
}

export interface ImbalanceExperiment {
  method: string;
  technique: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  pr_auc: number;
  roc_auc: number;
  notes: string;
}

export interface IndustryConversionProfile {
  industry: IndustrySector;
  leadCount: number;
  avgConversionRate: number;
  championUpliftRate: number;
  avgContractValue: number;
  topConversionDriver: string;
}
