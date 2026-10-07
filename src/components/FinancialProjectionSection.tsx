import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Check, 
  Sliders, 
  Copy, 
  Target, 
  RotateCcw,
  Building2
} from 'lucide-react';
import { IndustrySector } from '../types/leadgen';
import { INDUSTRY_PROFILES } from '../data/leadgenData';
import { formatInr } from '../utils/formatters';

interface FinancialProjectionSectionProps {
  predictedProbability: number;
  industry?: IndustrySector;
  prospectName?: string;
  company?: string;
  scoreTier?: string;
}

interface SectorBenchmarkConfig {
  baseAcv: number; // in INR
  nrr: number; // e.g. 1.18 = 118%
  grossMargin: number; // e.g. 0.82 = 82%
  setupFee: number; // in INR
  sdrCost: number; // in INR
  avgSalesCycleDays: number;
  targetPaybackMonths: number;
}

const SECTOR_BENCHMARK_CONFIGS: Record<IndustrySector, SectorBenchmarkConfig> = {
  'Enterprise SaaS': {
    baseAcv: 2400000, // ₹24 Lakhs
    nrr: 1.18,
    grossMargin: 0.82,
    setupFee: 300000,
    sdrCost: 15000,
    avgSalesCycleDays: 45,
    targetPaybackMonths: 3.2
  },
  'FinTech & Banking': {
    baseAcv: 3500000, // ₹35 Lakhs
    nrr: 1.24,
    grossMargin: 0.78,
    setupFee: 650000,
    sdrCost: 18000,
    avgSalesCycleDays: 60,
    targetPaybackMonths: 4.1
  },
  'Cloud & Cybersecurity': {
    baseAcv: 3000000, // ₹30 Lakhs
    nrr: 1.20,
    grossMargin: 0.85,
    setupFee: 400000,
    sdrCost: 16000,
    avgSalesCycleDays: 50,
    targetPaybackMonths: 3.5
  },
  'HealthTech & Bio': {
    baseAcv: 2600000, // ₹26 Lakhs
    nrr: 1.12,
    grossMargin: 0.76,
    setupFee: 500000,
    sdrCost: 17500,
    avgSalesCycleDays: 65,
    targetPaybackMonths: 4.5
  },
  'PropTech & Real Estate': {
    baseAcv: 2100000, // ₹21 Lakhs
    nrr: 1.08,
    grossMargin: 0.79,
    setupFee: 200000,
    sdrCost: 14000,
    avgSalesCycleDays: 35,
    targetPaybackMonths: 2.8
  },
  'E-Commerce & Retail': {
    baseAcv: 1600000, // ₹16 Lakhs
    nrr: 1.15,
    grossMargin: 0.74,
    setupFee: 120000,
    sdrCost: 12000,
    avgSalesCycleDays: 25,
    targetPaybackMonths: 2.2
  },
  'EduTech & EdServices': {
    baseAcv: 1250000, // ₹12.5 Lakhs
    nrr: 1.05,
    grossMargin: 0.72,
    setupFee: 100000,
    sdrCost: 10000,
    avgSalesCycleDays: 40,
    targetPaybackMonths: 3.0
  }
};

export const FinancialProjectionSection: React.FC<FinancialProjectionSectionProps> = ({
  predictedProbability,
  industry = 'Enterprise SaaS',
  prospectName = 'Simulated Prospect',
  company = 'Enterprise Lead Org',
  scoreTier = 'Hot Lead'
}) => {
  const benchmarkConfig = useMemo(() => {
    return SECTOR_BENCHMARK_CONFIGS[industry] || SECTOR_BENCHMARK_CONFIGS['Enterprise SaaS'];
  }, [industry]);

  const sectorProfile = useMemo(() => {
    return (
      INDUSTRY_PROFILES.find(p => p.industry === industry) ||
      INDUSTRY_PROFILES[0]
    );
  }, [industry]);

  // Interactive Overrides
  const [customAcv, setCustomAcv] = useState<number>(benchmarkConfig.baseAcv);
  const [nrrPercent, setNrrPercent] = useState<number>(Math.round(benchmarkConfig.nrr * 100));
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(Math.round(benchmarkConfig.grossMargin * 100));
  const [setupFee, setSetupFee] = useState<number>(benchmarkConfig.setupFee);
  const [sdrCost, setSdrCost] = useState<number>(benchmarkConfig.sdrCost);
  const [showAdvancedLevers, setShowAdvancedLevers] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Sync state when industry prop changes
  useEffect(() => {
    setCustomAcv(benchmarkConfig.baseAcv);
    setNrrPercent(Math.round(benchmarkConfig.nrr * 100));
    setGrossMarginPercent(Math.round(benchmarkConfig.grossMargin * 100));
    setSetupFee(benchmarkConfig.setupFee);
    setSdrCost(benchmarkConfig.sdrCost);
  }, [industry, benchmarkConfig]);

  const handleResetToBenchmark = () => {
    setCustomAcv(benchmarkConfig.baseAcv);
    setNrrPercent(Math.round(benchmarkConfig.nrr * 100));
    setGrossMarginPercent(Math.round(benchmarkConfig.grossMargin * 100));
    setSetupFee(benchmarkConfig.setupFee);
    setSdrCost(benchmarkConfig.sdrCost);
  };

  // Actuarial 12-Month Calculations
  const calculations = useMemo(() => {
    const acv = customAcv;
    const nrr = nrrPercent / 100;
    const gm = grossMarginPercent / 100;
    const prob = Math.min(1.0, Math.max(0.001, predictedProbability));

    const closedWon12MoClv = (acv * nrr * gm) + setupFee;
    const expected12MoClv = prob * closedWon12MoClv;

    const industryBaseProb = sectorProfile.avgConversionRate / 100;
    const industryBaselineClv = industryBaseProb * closedWon12MoClv;

    const championBaseProb = sectorProfile.championUpliftRate / 100;
    const championBaselineClv = championBaseProb * closedWon12MoClv;

    const alphaClv = expected12MoClv - industryBaselineClv;
    const alphaPercent = industryBaselineClv > 0 ? (alphaClv / industryBaselineClv) * 100 : 0;

    const expectedNetClv = expected12MoClv - sdrCost;
    const roiMultiple = sdrCost > 0 ? expected12MoClv / sdrCost : 0;

    // Monthly cumulative trajectory schedule (M1 - M12)
    const monthlyBaseRecur = (acv * gm) / 12;
    const expansionGrowthPerMonth = ((acv * (nrr - 1)) * gm) / 6;

    const monthlyTrajectory = [];
    let cumClosed = 0;

    for (let m = 1; m <= 12; m++) {
      let monthCash = 0;
      if (m === 1) {
        monthCash = setupFee + monthlyBaseRecur;
      } else if (m <= 6) {
        monthCash = monthlyBaseRecur;
      } else {
        monthCash = monthlyBaseRecur + (expansionGrowthPerMonth * ((m - 6) / 3));
      }
      cumClosed += monthCash;

      monthlyTrajectory.push({
        month: `M${m}`,
        monthNum: m,
        closedWonCum: Math.round(cumClosed),
        expectedCum: Math.round(cumClosed * prob),
        industryBaselineCum: Math.round(cumClosed * industryBaseProb)
      });
    }

    // Determine Commercial Action Tier in INR
    let routingTier: {
      name: string;
      color: string;
      bg: string;
      border: string;
      recommendation: string;
      sdrProtocol: string;
    };

    if (expected12MoClv >= 2000000) {
      routingTier = {
        name: 'Tier 1: Strategic Enterprise White-Glove (₹20L+)',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-700/60',
        recommendation: 'Direct VP of Sales & Senior Solutions Architect assignment. Deploy customized Sandbox POC within 24 business hours.',
        sdrProtocol: 'Bypass standard queue. Executive InMail + direct phone outreach within 15 minutes.'
      };
    } else if (expected12MoClv >= 1000000) {
      routingTier = {
        name: 'Tier 2: Key Account High-Yield (₹10L - ₹20L)',
        color: 'text-cyan-400',
        bg: 'bg-cyan-950/40',
        border: 'border-cyan-700/60',
        recommendation: 'Senior Account Executive scheduled discovery call. Provide sector-specific benchmark report and tailored ROI matrix.',
        sdrProtocol: 'Priority queue outreach within 1 hour. Multi-channel LinkedIn + phone cadence.'
      };
    } else if (expected12MoClv >= 300000) {
      routingTier = {
        name: 'Tier 3: Standard Commercial Pipeline (₹3L - ₹10L)',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40',
        border: 'border-amber-700/60',
        recommendation: 'Automated calendar booking link with technical pre-screening questionnaire. Invite to weekly live group demo.',
        sdrProtocol: 'Standard outbound 5-touch nurture cadence over 10 business days.'
      };
    } else {
      routingTier = {
        name: 'Tier 4: Product-Led Automated Nurture (<₹3L)',
        color: 'text-slate-400',
        bg: 'bg-slate-900/40',
        border: 'border-slate-800',
        recommendation: 'Preserve high-cost human rep capacity. Direct lead to automated interactive product tour and self-serve onboarding drip.',
        sdrProtocol: 'Automated marketing sequence only; human intervention paused until intent score reaches 40+.'
      };
    }

    return {
      acv,
      closedWon12MoClv,
      expected12MoClv,
      industryBaselineClv,
      championBaselineClv,
      alphaClv,
      alphaPercent,
      expectedNetClv,
      roiMultiple,
      monthlyTrajectory,
      routingTier
    };
  }, [
    customAcv,
    nrrPercent,
    grossMarginPercent,
    setupFee,
    sdrCost,
    predictedProbability,
    sectorProfile
  ]);

  // Sector cross-benchmark list
  const sectorCrossBenchmarks = useMemo(() => {
    return INDUSTRY_PROFILES.map(prof => {
      const config = SECTOR_BENCHMARK_CONFIGS[prof.industry] || SECTOR_BENCHMARK_CONFIGS['Enterprise SaaS'];
      const sectorClosedWonClv = (config.baseAcv * config.nrr * config.grossMargin) + config.setupFee;
      const expectedAtCurrentProb = predictedProbability * sectorClosedWonClv;
      const sectorAvgExpected = (prof.avgConversionRate / 100) * sectorClosedWonClv;

      return {
        industry: prof.industry,
        baseAcv: config.baseAcv,
        avgConversionRate: prof.avgConversionRate,
        championUpliftRate: prof.championUpliftRate,
        closedWonClv: sectorClosedWonClv,
        expectedAtCurrentProb,
        sectorAvgExpected,
        isCurrent: prof.industry === industry
      };
    }).sort((a, b) => b.expectedAtCurrentProb - a.expectedAtCurrentProb);
  }, [predictedProbability, industry]);

  // Copy CRM brief in INR
  const handleCopyCrmSummary = () => {
    const summary = `
[LEAD FORECAST BRIEF - 12-MONTH CLV PROJECTION (INR)]
Prospect: ${prospectName} (${company})
Sector: ${industry} | Classification Tier: ${scoreTier}
Predicted Conversion Probability: ${(predictedProbability * 100).toFixed(1)}% (vs Sector Base: ${sectorProfile.avgConversionRate}%)

FINANCIAL METRICS (INR ₹):
- Base Contract Value (ACV): ${formatInr(calculations.acv, 'full')}
- Expected 12-Mo CLV (Risk-Adjusted): ${formatInr(Math.round(calculations.expected12MoClv), 'full')} (${formatInr(calculations.expected12MoClv, 'compact')})
- Closed-Won 12-Mo Realized CLV: ${formatInr(Math.round(calculations.closedWon12MoClv), 'full')}
- Sector Baseline Lead Value: ${formatInr(Math.round(calculations.industryBaselineClv), 'full')}
- Incremental Lead Alpha: ${calculations.alphaClv >= 0 ? '+' : ''}${formatInr(Math.round(calculations.alphaClv), 'full')} (${calculations.alphaPercent >= 0 ? '+' : ''}${calculations.alphaPercent.toFixed(1)}%)
- Expected Net Profit (post-SDR outreach): ${formatInr(Math.round(calculations.expectedNetClv), 'full')}
- Projected Acquisition ROI: ${calculations.roiMultiple.toFixed(1)}x

ROUTING & PLAYBOOK:
- Designation: ${calculations.routingTier.name}
- Recommended Next Step: ${calculations.routingTier.recommendation}
- SDR Protocol: ${calculations.routingTier.sdrProtocol}
Generated by LeadGen ML Intelligence Engine
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  // SVG Chart helpers
  const maxTrajectoryVal = Math.max(
    ...calculations.monthlyTrajectory.map(d => d.closedWonCum),
    1
  );
  const chartHeight = 160;
  const chartWidth = 560;
  const paddingX = 55;
  const paddingY = 20;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  const getSvgCoordinates = (dataKey: 'closedWonCum' | 'expectedCum' | 'industryBaselineCum') => {
    return calculations.monthlyTrajectory.map((pt, idx) => {
      const x = paddingX + (idx / (calculations.monthlyTrajectory.length - 1)) * usableWidth;
      const y = paddingY + usableHeight - (pt[dataKey] / maxTrajectoryVal) * usableHeight;
      return { x, y, pt };
    });
  };

  const closedPoints = getSvgCoordinates('closedWonCum');
  const expectedPoints = getSvgCoordinates('expectedCum');
  const baselinePoints = getSvgCoordinates('industryBaselineCum');

  const makePathD = (pts: { x: number; y: number }[]) => {
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  };

  const makeAreaD = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return '';
    const linePath = makePathD(pts);
    const lastPt = pts[pts.length - 1];
    const firstPt = pts[0];
    const bottomY = paddingY + usableHeight;
    return `${linePath} L ${lastPt.x.toFixed(1)} ${bottomY} L ${firstPt.x.toFixed(1)} ${bottomY} Z`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-base">
              ₹
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Financial Projection & 12-Month CLV Modeling (INR ₹)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-400">
                  Actuarial Engine v2.4 (INR Edition)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic 12-month Customer Lifetime Value calculation combining predicted probability with <strong className="text-slate-200">{industry}</strong> unit economics in Indian Rupee (₹).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAdvancedLevers(!showAdvancedLevers)}
            className={`px-3 py-1.5 text-xs rounded-lg border font-medium flex items-center gap-1.5 transition-colors ${
              showAdvancedLevers 
                ? 'bg-slate-800 text-white border-slate-600' 
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            {showAdvancedLevers ? 'Hide Unit Levers' : 'Adjust Unit Economics (₹)'}
          </button>

          <button
            onClick={handleCopyCrmSummary}
            className="px-3 py-1.5 text-xs rounded-lg bg-cyan-950/70 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 flex items-center gap-1.5 font-medium transition-colors"
          >
            {copiedSummary ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied CRM Brief!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Export to CRM (₹)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Expected 12-Month CLV */}
        <div className="p-4 bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-cyan-900/40 relative group hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium text-slate-300">Expected 12-Mo CLV</span>
            <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/80">
              p × Value
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold font-mono text-white tracking-tight">
            {formatInr(Math.round(calculations.expected12MoClv), 'compact')}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            {formatInr(Math.round(calculations.expected12MoClv), 'full')}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {calculations.alphaClv >= 0 ? (
              <span className="inline-flex items-center text-emerald-400 font-semibold font-mono text-[11px]">
                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                +{formatInr(Math.round(calculations.alphaClv), 'compact')}
              </span>
            ) : (
              <span className="inline-flex items-center text-rose-400 font-semibold font-mono text-[11px]">
                <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                -{formatInr(Math.round(Math.abs(calculations.alphaClv)), 'compact')}
              </span>
            )}
            <span className="text-[11px] text-slate-400">vs sector median lead</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed border-t border-slate-800 pt-2">
            Probability-weighted actuarial revenue expected over first 365 days.
          </p>
        </div>

        {/* Card 2: Closed-Won Ceiling (100% Conversion) */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium text-slate-300">Closed-Won Realized CLV</span>
            <span className="font-mono text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800/80">
              If Converted (1.0)
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold font-mono text-emerald-300 tracking-tight">
            {formatInr(Math.round(calculations.closedWon12MoClv), 'compact')}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            {formatInr(Math.round(calculations.closedWon12MoClv), 'full')}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>ACV: {formatInr(calculations.acv, 'compact')}</span>
            <span className="text-slate-300">NRR: {nrrPercent}%</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed border-t border-slate-800 pt-2">
            Gross customer value including {nrrPercent}% Net Retention & {formatInr(setupFee, 'compact')} onboarding.
          </p>
        </div>

        {/* Card 3: Sector Baseline Lead Benchmark */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium text-slate-300">{industry} Baseline</span>
            <span className="font-mono text-[10px] text-amber-400 px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800/80">
              Avg Conv: {sectorProfile.avgConversionRate}%
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold font-mono text-amber-300 tracking-tight">
            {formatInr(Math.round(calculations.industryBaselineClv), 'compact')}
          </div>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            {formatInr(Math.round(calculations.industryBaselineClv), 'full')}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>Lead Alpha:</span>
            <span className={`font-bold ${calculations.alphaPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {calculations.alphaPercent >= 0 ? `+${calculations.alphaPercent.toFixed(1)}%` : `${calculations.alphaPercent.toFixed(1)}%`}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed border-t border-slate-800 pt-2">
            Expected yield from a median un-scored prospect in this vertical.
          </p>
        </div>

        {/* Card 4: Net Sales Contribution & ROI Multiple */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-medium text-slate-300">Expected Net ROI</span>
            <span className="font-mono text-[10px] text-purple-400 px-1.5 py-0.5 rounded bg-purple-950 border border-purple-800/80">
              Post-SDR Cost
            </span>
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold font-mono text-purple-300 tracking-tight">
            {calculations.roiMultiple.toFixed(1)}x
          </div>
          <div className="text-xs font-mono text-slate-400 mt-0.5">
            Net: {formatInr(Math.round(calculations.expectedNetClv), 'full')}
          </div>
          <div className="mt-2 text-xs flex items-center justify-between text-slate-400 font-mono text-[11px]">
            <span>Outreach Cost:</span>
            <span className="text-rose-400 font-semibold">
              {formatInr(sdrCost, 'full')}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed border-t border-slate-800 pt-2">
            Net return per rupee spent on SDR qualification touches.
          </p>
        </div>
      </div>

      {/* Collapsible Advanced Unit Economics Levers */}
      {showAdvancedLevers && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Unit Economics & Commercial Parameters ({industry}) — INR ₹
              </h4>
            </div>
            <button
              onClick={handleResetToBenchmark}
              className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset to Sector Benchmark
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            {/* Lever 1: Base ACV */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Base Annual Contract (ACV)</span>
                <span className="font-mono text-cyan-400 font-bold">{formatInr(customAcv, 'compact')}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={100000}
                value={customAcv}
                onChange={e => setCustomAcv(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>₹5 L (Starter)</span>
                <span>₹35 L (Mid)</span>
                <span>₹1 Cr (Enterprise)</span>
              </div>
            </div>

            {/* Lever 2: 12-Month NRR */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>12-Month Net Retention (NRR)</span>
                <span className="font-mono text-cyan-400 font-bold">{nrrPercent}%</span>
              </div>
              <input
                type="range"
                min={85}
                max={150}
                step={1}
                value={nrrPercent}
                onChange={e => setNrrPercent(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>85% (Churn)</span>
                <span>100% (Flat)</span>
                <span>150% (High Growth)</span>
              </div>
            </div>

            {/* Lever 3: Gross Margin */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Gross Margin %</span>
                <span className="font-mono text-cyan-400 font-bold">{grossMarginPercent}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={95}
                step={1}
                value={grossMarginPercent}
                onChange={e => setGrossMarginPercent(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>50% (High COGS)</span>
                <span>80% (Avg Tech)</span>
                <span>95% (Pure SaaS)</span>
              </div>
            </div>

            {/* Lever 4: Setup & Onboarding Fee */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Setup & Implementation Fee</span>
                <span className="font-mono text-cyan-400 font-bold">{formatInr(setupFee, 'compact')}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1500000}
                step={25000}
                value={setupFee}
                onChange={e => setSetupFee(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>₹0 (Self-Serve)</span>
                <span>₹3 L</span>
                <span>₹15 L (Custom)</span>
              </div>
            </div>

            {/* Lever 5: SDR Qualification Cost */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>SDR Touch Cost (Cost of FP)</span>
                <span className="font-mono text-cyan-400 font-bold">{formatInr(sdrCost, 'full')}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={80000}
                step={1000}
                value={sdrCost}
                onChange={e => setSdrCost(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                <span>₹2,000 (Inbound)</span>
                <span>₹15,000 (Median)</span>
                <span>₹80,000 (Senior SE)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Visual: 12-Month Cumulative Trajectory & Playbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 Cols): Cumulative 12-Month Revenue Trajectory Chart */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                12-Month Cumulative Cashflow & Value Trajectory (₹)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Progression from onboarding through renewal, comparing Expected vs Closed-Won ceiling in INR.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                Lead Expected ({(predictedProbability * 100).toFixed(1)}%)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                Closed-Won (100%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 font-medium hidden sm:flex">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                Sector Base ({sectorProfile.avgConversionRate}%)
              </span>
            </div>
          </div>

          {/* SVG Trajectory Visualization */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-lg p-3">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-44 overflow-visible"
            >
              <defs>
                <linearGradient id="expectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="closedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = paddingY + usableHeight - ratio * usableHeight;
                const val = Math.round(ratio * maxTrajectoryVal);
                return (
                  <g key={i}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={paddingX - 6}
                      y={y + 3}
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                    >
                      {formatInr(val, 'compact')}
                    </text>
                  </g>
                );
              })}

              {/* Area Under Closed Curve */}
              <path
                d={makeAreaD(closedPoints)}
                fill="url(#closedGradient)"
              />

              {/* Area Under Expected Curve */}
              <path
                d={makeAreaD(expectedPoints)}
                fill="url(#expectedGradient)"
              />

              {/* Closed-Won Curve Line */}
              <path
                d={makePathD(closedPoints)}
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Baseline Curve Line */}
              <path
                d={makePathD(baselinePoints)}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Expected Curve Line */}
              <path
                d={makePathD(expectedPoints)}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />

              {/* Month X Labels */}
              {calculations.monthlyTrajectory.map((pt, idx) => {
                const x = paddingX + (idx / (calculations.monthlyTrajectory.length - 1)) * usableWidth;
                const isQuarter = (idx + 1) % 3 === 0 || idx === 0;
                return (
                  <g key={pt.month}>
                    <line
                      x1={x}
                      y1={paddingY + usableHeight}
                      x2={x}
                      y2={paddingY + usableHeight + 4}
                      stroke="#475569"
                    />
                    <text
                      x={x}
                      y={paddingY + usableHeight + 14}
                      fill={isQuarter ? '#cbd5e1' : '#64748b'}
                      fontSize={isQuarter ? '9' : '8'}
                      fontWeight={isQuarter ? 'bold' : 'normal'}
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {pt.month}
                    </text>
                  </g>
                );
              })}

              {/* Data points for M12 */}
              {expectedPoints.length > 0 && (
                <g>
                  <circle
                    cx={expectedPoints[expectedPoints.length - 1].x}
                    cy={expectedPoints[expectedPoints.length - 1].y}
                    r="4"
                    fill="#06b6d4"
                    stroke="#082f49"
                    strokeWidth="2"
                  />
                  <circle
                    cx={closedPoints[closedPoints.length - 1].x}
                    cy={closedPoints[closedPoints.length - 1].y}
                    r="4"
                    fill="#10b981"
                    stroke="#064e3b"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Trajectory Milestone Cards in INR */}
          <div className="grid grid-cols-4 gap-2 text-center pt-1">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Month 1 (Setup)</span>
              <span className="font-bold font-mono text-white text-xs block mt-0.5">
                {formatInr(calculations.monthlyTrajectory[0].expectedCum, 'compact')}
              </span>
              <span className="text-[9px] text-slate-400 block">Initial Onboarding</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Month 6 (Mid-Year)</span>
              <span className="font-bold font-mono text-white text-xs block mt-0.5">
                {formatInr(calculations.monthlyTrajectory[5].expectedCum, 'compact')}
              </span>
              <span className="text-[9px] text-slate-400 block">H1 Steady State</span>
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">Month 9 (Expansion)</span>
              <span className="font-bold font-mono text-white text-xs block mt-0.5">
                {formatInr(calculations.monthlyTrajectory[8].expectedCum, 'compact')}
              </span>
              <span className="text-[9px] text-emerald-400 block">+{nrrPercent - 100}% NRR Kick</span>
            </div>
            <div className="p-2 bg-cyan-950/40 rounded-lg border border-cyan-800/60">
              <span className="text-[10px] text-cyan-300 block font-mono">Month 12 (Year 1)</span>
              <span className="font-bold font-mono text-cyan-400 text-xs block mt-0.5">
                {formatInr(calculations.monthlyTrajectory[11].expectedCum, 'compact')}
              </span>
              <span className="text-[9px] text-cyan-300/80 block">Cumulative CLV</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Strategic Routing Playbook & Industry Profile */}
        <div className="lg:col-span-5 space-y-4">
          {/* Commercial Routing Playbook Card */}
          <div className={`p-4 rounded-xl border ${calculations.routingTier.border} ${calculations.routingTier.bg} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Sales Protocol</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${calculations.routingTier.color}`}>
                {calculations.routingTier.name.split(':')[0]}
              </span>
            </div>

            <div className="text-sm font-bold text-white leading-tight">
              {calculations.routingTier.name}
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800/60">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                  Commercial Action
                </span>
                <p className="text-slate-200 text-xs leading-relaxed">
                  {calculations.routingTier.recommendation}
                </p>
              </div>

              <div className="p-2.5 bg-slate-950/70 rounded-lg border border-slate-800/60">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                  SDR Qualification SLA
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {calculations.routingTier.sdrProtocol}
                </p>
              </div>
            </div>
          </div>

          {/* Sector Profile & Intent Driver Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Building2 className="h-4 w-4 text-cyan-400" />
                <span>Sector Conversion Profile</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                n = {sectorProfile.leadCount.toLocaleString()} leads
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Sector Median ACV</span>
                <span className="font-mono font-bold text-white mt-0.5 block">
                  {formatInr(sectorProfile.avgContractValue, 'compact')}
                </span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Top Conversion Driver</span>
                <span className="font-mono text-emerald-400 mt-0.5 block truncate" title={sectorProfile.topConversionDriver}>
                  High Signal Touch
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[11px]">
              <span className="text-slate-400 block text-[10px] mb-1">Key Intent Driver for {industry}:</span>
              <p className="text-slate-200 leading-snug">
                "{sectorProfile.topConversionDriver}"
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
              <span>Avg Sales Cycle: <strong className="text-white">{benchmarkConfig.avgSalesCycleDays} days</strong></span>
              <span>Target CAC Payback: <strong className="text-white">{benchmarkConfig.targetPaybackMonths} mo</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Sector Cross-Comparison Matrix in INR */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden space-y-3 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <Target className="h-3.5 w-3.5 text-cyan-400" />
              Cross-Sector CLV Simulation at Current Lead Probability ({(predictedProbability * 100).toFixed(1)}%) — INR ₹
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Evaluating how this specific buyer behavior profile would translate financially across all 7 B2B industry verticals.
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 self-start sm:self-auto">
            Current Sector: {industry}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-2.5">Industry Sector</th>
                <th className="p-2.5">Sector Baseline Conv</th>
                <th className="p-2.5">Benchmark ACV</th>
                <th className="p-2.5">Closed-Won 12-Mo CLV</th>
                <th className="p-2.5 text-right">Expected 12-Mo CLV (p)</th>
                <th className="p-2.5 text-right">Delta vs Sector Avg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {sectorCrossBenchmarks.map((sector) => {
                const delta = sector.expectedAtCurrentProb - sector.sectorAvgExpected;
                return (
                  <tr
                    key={sector.industry}
                    className={`transition-colors ${
                      sector.isCurrent
                        ? 'bg-cyan-950/30 text-white font-semibold border-l-2 border-l-cyan-400'
                        : 'hover:bg-slate-900/40 text-slate-300'
                    }`}
                  >
                    <td className="p-2.5 font-sans flex items-center gap-2">
                      {sector.isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      )}
                      <span>{sector.industry}</span>
                      {sector.isCurrent && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-2.5 text-slate-400">
                      {sector.avgConversionRate.toFixed(1)}%
                    </td>
                    <td className="p-2.5 text-slate-300">
                      {formatInr(sector.baseAcv, 'compact')}
                    </td>
                    <td className="p-2.5 text-slate-300">
                      {formatInr(Math.round(sector.closedWonClv), 'compact')}
                    </td>
                    <td className="p-2.5 text-right font-bold text-white">
                      {formatInr(Math.round(sector.expectedAtCurrentProb), 'compact')}
                    </td>
                    <td className="p-2.5 text-right">
                      <span className={`inline-flex items-center ${
                        delta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {delta >= 0 ? `+${formatInr(Math.round(delta), 'compact')}` : `-${formatInr(Math.round(Math.abs(delta)), 'compact')}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
