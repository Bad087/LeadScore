import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Layers, 
  Activity, 
  Zap, 
  Sparkles, 
  BarChart3, 
  Sliders, 
  Eye, 
  TrendingUp, 
  Network, 
  GitBranch, 
  Compass, 
  Info, 
  CheckCircle2, 
  Clock, 
  Database 
} from 'lucide-react';
import { 
  DEEP_LEARNING_EPOCHS_DATA, 
  TABNET_ATTENTION_STEPS, 
  ENTITY_EMBEDDING_POINTS, 
  BENCHMARK_MODELS 
} from '../data/leadgenData';

export const DeepLearningStudio: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<number>(100);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [focalGamma, setFocalGamma] = useState<number>(2.0);
  const [focalAlpha, setFocalAlpha] = useState<number>(0.65);
  const [activeArchitecture, setActiveArchitecture] = useState<'tabnet' | 'ft_transformer' | 'resnet' | 'cnn_lstm'>('tabnet');

  // Find metric at selected epoch
  const currentEpochMetric = useMemo(() => {
    return (
      DEEP_LEARNING_EPOCHS_DATA.find(d => d.epoch === selectedEpoch) ||
      DEEP_LEARNING_EPOCHS_DATA[DEEP_LEARNING_EPOCHS_DATA.length - 1]
    );
  }, [selectedEpoch]);

  // Deep Learning Models list
  const deepLearningModels = useMemo(() => {
    return BENCHMARK_MODELS.filter(m => m.family === 'Deep Learning' || m.family === 'Super-Ensemble');
  }, []);

  // Selected TabNet attention step
  const activeAttentionStep = useMemo(() => {
    return TABNET_ATTENTION_STEPS.find(s => s.step === activeStepTab) || TABNET_ATTENTION_STEPS[0];
  }, [activeStepTab]);

  // Focal loss curve points for gamma curve
  const focalLossCurve = useMemo(() => {
    const points = [];
    for (let pt = 0.01; pt <= 0.99; pt += 0.02) {
      const bce = -Math.log(pt);
      const modulatingFactor = Math.pow(1 - pt, focalGamma);
      const fl = focalAlpha * modulatingFactor * bce;
      points.push({ pt, bce, fl, modulatingFactor });
    }
    return points;
  }, [focalGamma, focalAlpha]);

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* HEADER BANNER                                             */}
      {/* ========================================================= */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-950/80 border border-purple-700/60 text-purple-300">
                DEEP LEARNING TABULAR SUITE
              </span>
              <span className="text-slate-500 text-xs font-mono">PyTorch 2.4 • CUDA Acceleration</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="h-5 w-5 text-purple-400" />
              <span>Deep Tabular Architectures, Attention Mechanisms & Focal Loss</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Surpassing conventional tree ensembles through <strong>TabNet Sparsemax Attention</strong>, <strong>Feature Tokenizer Transformers (FT-Transformer)</strong>, and <strong>Entity Embedding Residual Networks</strong>. Deep learning dynamically overcomes lead class imbalance through modulated focal gradients while maintaining sub-3ms production inference latency.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0 text-center font-mono text-xs">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase">TabNet ROC-AUC</span>
              <span className="text-lg font-bold text-cyan-400">0.908</span>
              <span className="text-[10px] text-slate-400 block">3 Decision Steps</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase">FT-Transformer</span>
              <span className="text-lg font-bold text-purple-400">88.1%</span>
              <span className="text-[10px] text-slate-400 block">8-Head Attention</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 block uppercase">Focal Loss Lift</span>
              <span className="text-lg font-bold text-emerald-400">+15.0%</span>
              <span className="text-[10px] text-slate-400 block">Minority Recall</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ARCHITECTURE SELECTOR TABS                                */}
      {/* ========================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'tabnet', label: 'TabNet (Attentive Transformer)', icon: Eye },
          { id: 'ft_transformer', label: 'FT-Transformer (Tokenized Embeddings)', icon: Network },
          { id: 'resnet', label: 'PyTorch Tabular ResNet (Entity Embeddings)', icon: GitBranch },
          { id: 'cnn_lstm', label: 'Clickstream 1D-CNN + BiLSTM (Temporal Velocity)', icon: Activity }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeArchitecture === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveArchitecture(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 ${
                isActive
                  ? 'bg-purple-950/60 text-purple-300 border-purple-500/60 shadow-lg shadow-purple-950/30'
                  : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* GRAPH 1 & GRAPH 2: TRAINING DYNAMICS & LEARNING RATE      */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph 1: Loss Convergence (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                Training Dynamics: Binary Cross-Entropy vs PyTorch Focal Loss (Epochs 1-100)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Comparing convergence velocity. Focal Loss down-weights easy negatives to accelerate optimization.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                Val Focal Loss ({currentEpochMetric.valLossFocal.toFixed(3)})
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-0.5 bg-cyan-400" />
                Val BCE ({currentEpochMetric.valLossBCE.toFixed(3)})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400" />
                Accuracy ({(currentEpochMetric.valAccuracy * 100).toFixed(1)}%)
              </span>
            </div>
          </div>

          {/* SVG Loss Curve Canvas */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-4">
            <svg viewBox="0 0 680 200" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="focalLossGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                const y = 20 + 150 * pct;
                const val = 0.70 - pct * 0.70;
                return (
                  <g key={i}>
                    <line x1="45" y1={y} x2="660" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x="38" y={y + 3} fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end">
                      {val.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Epoch X-Axis ticks */}
              {[1, 20, 40, 60, 80, 100].map(ep => {
                const x = 45 + ((ep - 1) / 99) * 615;
                return (
                  <g key={ep}>
                    <line x1={x} y1="170" x2={x} y2="175" stroke="#475569" />
                    <text x={x} y="186" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      E{ep}
                    </text>
                  </g>
                );
              })}

              {/* BCE Validation Curve (Cyan) */}
              <path
                d={DEEP_LEARNING_EPOCHS_DATA.map((pt, i) => {
                  const x = 45 + ((pt.epoch - 1) / 99) * 615;
                  const y = 20 + 150 * (1 - pt.valLossBCE / 0.70);
                  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                }).join(' ')}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.8"
                strokeDasharray="4 2"
              />

              {/* Focal Loss Validation Curve (Purple) */}
              <path
                d={DEEP_LEARNING_EPOCHS_DATA.map((pt, i) => {
                  const x = 45 + ((pt.epoch - 1) / 99) * 615;
                  const y = 20 + 150 * (1 - pt.valLossFocal / 0.70);
                  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                }).join(' ')}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />

              {/* Accuracy Curve (Emerald) */}
              <path
                d={DEEP_LEARNING_EPOCHS_DATA.map((pt, i) => {
                  const x = 45 + ((pt.epoch - 1) / 99) * 615;
                  const y = 20 + 150 * (1 - pt.valAccuracy);
                  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                }).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.8"
              />

              {/* Selected Epoch Indicator */}
              {(() => {
                const curX = 45 + ((selectedEpoch - 1) / 99) * 615;
                const focalY = 20 + 150 * (1 - currentEpochMetric.valLossFocal / 0.70);
                return (
                  <g>
                    <line x1={curX} y1="20" x2={curX} y2="170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx={curX} cy={focalY} r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })()}
            </svg>

            {/* Interactive Epoch Slider */}
            <div className="mt-3 pt-3 border-t border-slate-900 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Scrub Epoch: <strong className="text-white">Epoch {selectedEpoch} / 100</strong></span>
                <span className="text-purple-400">Val Focal Loss: <strong>{currentEpochMetric.valLossFocal.toFixed(3)}</strong></span>
                <span className="text-emerald-400">Val Accuracy: <strong>{(currentEpochMetric.valAccuracy * 100).toFixed(1)}%</strong></span>
                <span className="text-cyan-400">Val ROC-AUC: <strong>{currentEpochMetric.valRocAuc.toFixed(3)}</strong></span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={selectedEpoch}
                onChange={e => setSelectedEpoch(Number(e.target.value))}
                className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Graph 2: Focal Loss Modulating Function Simulator (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              PyTorch Focal Loss: FL(pt)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              FL(pt) = -&alpha;t (1 - pt)^&gamma; log(pt)
            </p>
          </div>

          {/* SVG Modulating Factor Curve */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3">
            <svg viewBox="0 0 280 140" className="w-full h-32">
              <line x1="25" y1="115" x2="265" y2="115" stroke="#334155" />
              <line x1="25" y1="15" x2="25" y2="115" stroke="#334155" />

              {/* Curve of (1 - pt)^gamma */}
              <path
                d={focalLossCurve.map((pt, i) => {
                  const x = 25 + pt.pt * 235;
                  const y = 115 - pt.modulatingFactor * 95;
                  return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                }).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />

              {/* Standard Cross Entropy Comparison (gamma = 0) */}
              <line x1="25" y1="20" x2="260" y2="20" stroke="#64748b" strokeDasharray="3 3" strokeWidth="1.2" />

              <text x="250" y="32" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="end">
                Standard CE (&gamma;=0)
              </text>
              <text x="140" y="132" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                Ground Truth Probability pt &rarr;
              </text>
            </svg>

            {/* Live Parameter Controls */}
            <div className="space-y-2.5 pt-2 text-xs font-mono">
              <div className="flex justify-between items-center text-slate-300">
                <span>Focusing Parameter (&gamma;):</span>
                <span className="text-amber-400 font-bold">{focalGamma.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={focalGamma}
                onChange={e => setFocalGamma(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1 rounded cursor-pointer"
              />

              <div className="flex justify-between items-center text-slate-300 pt-1">
                <span>Class Alpha Balance (&alpha;):</span>
                <span className="text-cyan-400 font-bold">{focalAlpha.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={0.9}
                step={0.05}
                value={focalAlpha}
                onChange={e => setFocalAlpha(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl text-xs space-y-1">
            <span className="font-semibold text-purple-300 flex items-center gap-1.5 font-mono text-[11px]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Empirical Capstone Finding:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              At &gamma; = 2.0, well-classified leads with pt &ge; 0.9 experience a <strong>100x gradient loss reduction</strong>, preventing the model from over-optimizing easy rejections.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GRAPH 3: TABNET SEQUENTIAL ATTENTION STEP HEATMAP        */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* TabNet Attention Visualizer (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <Eye className="h-4 w-4 text-cyan-400" />
                TabNet Sparsemax Sequential Feature Selection Masks
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Inspect which features TabNet focuses on across sequential decision steps (N_steps = 3).
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {[1, 2, 3].map(step => (
                <button
                  key={step}
                  onClick={() => setActiveStepTab(step)}
                  className={`px-2.5 py-1 text-xs font-mono rounded font-semibold transition-all ${
                    activeStepTab === step
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Step {step}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-850 space-y-2">
            <div className="text-xs font-bold text-white">{activeAttentionStep.name}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {activeAttentionStep.description}
            </p>
          </div>

          {/* Bar Chart of Feature Weights in this Step */}
          <div className="space-y-2.5 pt-1">
            {activeAttentionStep.featureWeights.map((fw, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{fw.feature}</span>
                  <span className="text-cyan-400 font-bold">{(fw.weight * 100).toFixed(0)}% Attention Weight</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${fw.weight * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GRAPH 4: 2D ENTITY EMBEDDING T-SNE SCATTER PROJECTION (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <Compass className="h-4 w-4 text-purple-400" />
                Entity Embeddings Latent Space (Indian Tech Hubs & Verticals)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                2D PCA/t-SNE projection of learned categorical weights showing semantic cluster separation.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              dim = 32 &rarr; 2D
            </span>
          </div>

          {/* SVG 2D Scatter Chart */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 relative">
            <svg viewBox="0 0 320 180" className="w-full h-44 overflow-visible">
              <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* Grid Background */}
              <line x1="20" y1="90" x2="300" y2="90" stroke="#1e293b" strokeDasharray="2 2" />
              <line x1="160" y1="15" x2="160" y2="165" stroke="#1e293b" strokeDasharray="2 2" />

              {/* High Intent Indian Hub Cluster Ellipse */}
              <ellipse cx="140" cy="55" rx="55" ry="35" fill="url(#hubGlow)" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
              <text x="140" y="24" fill="#06b6d4" fontSize="8" fontFamily="monospace" textAnchor="middle">
                Tier-1 Indian Tech Corridors Cluster
              </text>

              {/* Scatter Points */}
              {ENTITY_EMBEDDING_POINTS.map((pt, idx) => {
                const cx = 20 + (pt.x / 100) * 280;
                const cy = 165 - (pt.y / 100) * 150;
                const isTechHub = pt.category === 'Tech Hub';
                const isIndustry = pt.category === 'Industry';

                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isTechHub ? 4.5 : 3.5}
                      fill={isTechHub ? '#06b6d4' : isIndustry ? '#a855f7' : '#f59e0b'}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text
                      x={cx + 5}
                      y={cy + 3}
                      fill={isTechHub ? '#67e8f9' : '#cbd5e1'}
                      fontSize="7.5"
                      fontFamily="monospace"
                      fontWeight={isTechHub ? 'bold' : 'normal'}
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-900">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Indian Places (Bengaluru, Mumbai, HYD)
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Industry Verticals (SaaS, FinTech)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Global Hubs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* GRAPH 5: LATENCY VS ROC-AUC PARETO FRONTIER               */}
      {/* ========================================================= */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              Production Pareto Frontier: Inference Latency (ms) vs Holdout ROC-AUC
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Visualizing the algorithmic trade-off between predictive discrimination power and microservice execution budget.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            Target SLA: &lt; 5.0ms p95
          </span>
        </div>

        {/* Horizontal Model Bars with Dual Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {deepLearningModels.map((model) => (
            <div key={model.id} className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-sans text-xs">{model.name}</span>
                <span className="text-emerald-400 font-bold">{(model.accuracy * 100).toFixed(1)}% Acc</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[9px] text-slate-500">ROC-AUC</span>
                  <span className="font-bold text-cyan-400">{model.roc_auc.toFixed(3)}</span>
                </div>
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[9px] text-slate-500">LATENCY</span>
                  <span className="font-bold text-white">{model.latency_ms}ms</span>
                </div>
                <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="block text-[9px] text-slate-500">NET PROFIT</span>
                  <span className="font-bold text-emerald-400">₹{model.max_profit_crores} Cr</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-sans leading-tight pt-1">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
