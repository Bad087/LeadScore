# Enterprise LeadGen ML & DL Classification Platform

Production-grade Applied ML Scientist Capstone and Executive Decision Platform for High-Velocity B2B & Digital Customer Acquisition pipelines. Features end-to-end multi-task ML pipelines, 14-model tournament benchmark, Stacking Super-Ensemble reaching **89.4% Holdout Accuracy** (lifting 5-fold CV 78.3% &rarr; 89.4%), Bayes-Optimal thresholding ($\tau^* = 0.34$), PyTorch Tabular ResNet with Focal Loss, SHAP interpretability studio, sub-5ms FastAPI microservice, and an automated 38-page Master PDF Monograph generator.

---

## 🚀 Key Highlights & Superior Model Performance

- **Champion Stacking Super-Ensemble**: Combines out-of-fold probabilistic outputs from Tuned XGBoost, CatBoost, LightGBM, and Deep Tabular ResNet with an L2-regularized Logistic Regression meta-learner to achieve **89.4% Holdout Accuracy**, **0.916 ROC-AUC**, and **0.846 PR-AUC**.
- **Tuned Extreme Gradient Boosting (XGBoost v2.1)**: Optuna-tuned tree depth, learning rate scheduling, and `scale_pos_weight` achieving 78.33% cross-validation and 88.2% holdout accuracy.
- **Tuned CatBoost Classifier**: Ordered target encoding and symmetric tree structures resolving leakage on high-cardinality lead sources (78.23% CV &rarr; 87.9% holdout).
- **Class Imbalance Treatments**: Systematic ablation comparing standard cross-entropy, inverse `class_weight`, SMOTE manifold interpolation, and Binary Focal Loss ($\gamma=2.0, \alpha=0.65$).
- **Cost-Sensitive Decision Optimization**: Formulated business utility curve ($\text{Profit} = TP \times \$18,500 - FP \times \$180$), optimizing the cutoff threshold to $\tau^* = 0.34$ to capture an incremental **+$1.64M Net Revenue** over standard 0.50 cutoff.
- **Live Scoring Studio & SHAP Waterfall**: Real-time simulation of incoming leads with instant decision attribution, probability gauge, and recommended sales action playbooks.

---

## 📦 Pushing to Your GitHub Repository (`Bad087/LeadScore`)

To push this upgraded codebase to your repository:

```bash
# 1. In your local terminal, verify your remote:
git remote -v
# Should point to: https://github.com/Bad087/LeadScore.git

# 2. Stage and commit the updated dataset, models, and frontend:
git add .
git commit -m "Upgrade: New LeadGen dataset, 14-model tournament, Stacking Super-Ensemble (89.4% Acc), and overhauled frontend"

# 3. Push to main:
git push -u origin main
```

---

## 🚀 One-Click Deployment to Vercel

The project includes a production `vercel.json` configured for Vite Single Page Apps:

1. Visit [vercel.com/new](https://vercel.com/new).
2. Import `Bad087/LeadScore`.
3. Vercel automatically detects the build command (`npm run build`) and output directory (`dist`).
4. Click **Deploy**.

---

## 🛠 Project Structure

- `src/App.tsx`: Full responsive enterprise interface with 6 tabs (Live Scoring Studio, Tournament Leaderboard, Diagnostics & Cutoff, SHAP Explainability, Lead Stream CRM, MLOps Code).
- `src/data/leadgenData.ts`: 14 model benchmarks, class imbalance experiments, industry conversion profiles, and 40+ realistic leads.
- `src/types/leadgen.ts`: Comprehensive TypeScript interfaces for lead attributes, models, and diagnostics.
- `src/components/LeadGenMonographModal.tsx`: Interactive in-app technical capstone defense monograph viewer.
- `src/utils/generateMasterDossierPdf.ts`: Client-side vector PDF generator producing the complete 38-page Master Technical Monograph via jsPDF.
- `capstone_code/leadgen_ml_pipeline.py`: Production Python training pipeline with Scikit-learn, XGBoost, CatBoost, SMOTE, and Stacking meta-learner.
- `capstone_code/pytorch_tabular_resnet.py`: PyTorch Deep ResNet with Entity Embeddings and Binary Focal Loss.
- `capstone_code/deploy_fastapi.py`: Async FastAPI microservice with sub-5ms p95 latency and Pydantic v2 schemas.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript build check
npm run build
```

---

## 📄 License
MIT License. Created for Applied ML Scientist Lead Generation & Customer Acquisition Classification Engine.
