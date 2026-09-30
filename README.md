# Real Estate CRM ML Platform & 38-Page Master Capstone Monograph

Production-grade Applied ML Scientist Capstone and Executive Decision Platform for Real Estate CRM & PropTech ecosystems. Features end-to-end multi-task ML pipelines, 9-quarter inter-city market trendlines across tier-1 Indian metros, PyTorch multimodal late-fusion architectures, SHAP explainable AI, FastAPI production microservice, and an automated 38-page Master PDF Monograph generator.

---

## 🚀 One-Click Deployment to Vercel

You can deploy this project directly to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/real-estate-crm-ml-platform)

### Manual Vercel Deployment via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy directly from repository root
vercel
```

---

## 📦 Pushing to Your GitHub Repository

To push this codebase to your own GitHub account:

```bash
# 1. Create a new repository on GitHub (e.g. named real-estate-crm-ml-platform)
# 2. In your local terminal, add your remote:
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/real-estate-crm-ml-platform.git

# 3. Rename branch to main (if not already):
git branch -M main

# 4. Push all code:
git push -u origin main
```

---

## 🛠 Project Architecture & Features

1. **Inter-City Market Performance with 9-Quarter Historical Trendlines (2024 Q1 - 2026 Q1)**:
   - Covers top Indian metros: Bengaluru, Mumbai-MMR, Delhi-NCR, Hyderabad, Pune, and Chennai.
   - Interactive toggle modes: Grouped Bars, 9-Qtr Trendlines, Dual Overlay comparison, and Metric switchers.
   - CSV and SVG chart export capabilities.

2. **38-Page Master Capstone Monograph PDF**:
   - Automated client-side vector PDF generation via jsPDF.
   - Features 14 comprehensive chapters including mathematical formulations, loss functions, late-fusion architectures, and professor defense Q&A.
   - In-app preview modal with chapter navigation and print formatting.

3. **Production Python Codebase (`/capstone_code`)**:
   - `real_estate_ml_pipeline.py`: Production pipeline with 25 diagnostic matplotlib/seaborn plots, data generation, and model benchmarking.
   - `pytorch_multimodal_fusion.py`: PyTorch model combining tabular features (Entity Embeddings) and unstructured NLP agent remarks (BERT/Transformer) with Focal Loss.
   - `deploy_fastapi.py`: Low-latency async FastAPI microservice with Pydantic v2 schemas and model governance.
   - `capstone_colab_notebook.ipynb`: Google Colab ready runnable notebook.

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
MIT License. Created for Applied ML Scientist Capstone Defense.
