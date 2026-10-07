import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  DollarSign, 
  BarChart2, 
  Compass, 
  Layers, 
  Award, 
  ArrowUpRight, 
  CheckCircle2, 
  Globe2 
} from 'lucide-react';
import { REGIONAL_CITY_METRICS, INDUSTRY_PROFILES } from '../data/leadgenData';
import { formatInr } from '../utils/formatters';

export const RegionalAnalyticsSection: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<string>('Bengaluru, Karnataka');
  const [metricView, setMetricView] = useState<'conversion' | 'profit' | 'ticket'>('conversion');

  const selectedPlaceMetric = useMemo(() => {
    return (
      REGIONAL_CITY_METRICS.find(m => m.place === selectedPlace) ||
      REGIONAL_CITY_METRICS[0]
    );
  }, [selectedPlace]);

  // Aggregate regional stats
  const regionalSummary = useMemo(() => {
    const totalProfitCr = REGIONAL_CITY_METRICS.reduce((acc, c) => acc + c.totalProfitCrores, 0);
    const totalLeads = REGIONAL_CITY_METRICS.reduce((acc, c) => acc + c.leadCount, 0);
    const avgConv = REGIONAL_CITY_METRICS.reduce((acc, c) => acc + c.conversionRate * c.leadCount, 0) / totalLeads;
    return {
      totalProfitCr: Math.round(totalProfitCr * 10) / 10,
      totalLeads,
      avgConv: Math.round(avgConv * 10) / 10
    };
  }, []);

  // Max metrics for SVG charting
  const maxConv = 35;
  const maxProfitCr = 20;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 border border-emerald-700/60 text-emerald-300">
                GEOGRAPHIC & REGIONAL INTELLIGENCE
              </span>
              <span className="text-slate-500 text-xs font-mono">Indian Tech Hubs & Global Belts</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-400" />
              <span>City-Level Conversion Velocity & Regional Revenue Yields (INR ₹)</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Granular breakdown of lead conversion velocity across prominent Indian commercial centers (<strong>Bengaluru, Mumbai, Hyderabad, Gurugram, Pune</strong>) alongside key overseas expansion corridors. All revenue yields calibrated in Indian Rupee (₹ Crores & Lakhs).
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0 text-center font-mono text-xs">
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase">Total Pipeline Closed</span>
              <span className="text-lg font-bold text-emerald-400">₹{regionalSummary.totalProfitCr} Cr</span>
              <span className="text-[10px] text-slate-400 block">Across 8 Major Hubs</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-500 block uppercase">Weighted Conversion</span>
              <span className="text-lg font-bold text-cyan-400">{regionalSummary.avgConv}%</span>
              <span className="text-[10px] text-emerald-400 block">+66.4% ML Uplift</span>
            </div>
            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-500 block uppercase">Active Lead Volume</span>
              <span className="text-lg font-bold text-purple-400">{regionalSummary.totalLeads.toLocaleString()}</span>
              <span className="text-[10px] text-slate-400 block">Scored Profiles</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CHART 1 & CHART 2: CITY-WISE WIN RATE & TOTAL PROFIT (INR) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: City Conversion Rates (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-cyan-400" />
                City & Place Conversion Velocity: Baseline vs Champion ML (%)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Displays absolute conversion gains across Indian tech hubs and overseas territories.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block" />
                Baseline Sales
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-400 inline-block" />
                Champion ML
              </span>
            </div>
          </div>

          {/* Horizontal Bar Chart for Cities */}
          <div className="space-y-3 pt-1">
            {REGIONAL_CITY_METRICS.map((city) => {
              const isSelected = selectedPlace === city.place;
              return (
                <div
                  key={city.place}
                  onClick={() => setSelectedPlace(city.place)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md'
                      : 'bg-slate-950/60 border-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{city.place}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {city.region}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400">{city.baselineRate}% &rarr;</span>
                      <span className="text-cyan-400 font-bold">{city.conversionRate}%</span>
                      <span className="text-emerald-400 text-[11px] font-semibold">+{city.uplift}%</span>
                    </div>
                  </div>

                  {/* Dual Bar Progress */}
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex gap-1 p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-slate-600 rounded-l-full"
                      style={{ width: `${(city.baselineRate / maxConv) * 100}%` }}
                      title={`Baseline: ${city.baselineRate}%`}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-r-full"
                      style={{ width: `${((city.conversionRate - city.baselineRate) / maxConv) * 100}%` }}
                      title={`Uplift: +${city.uplift}%`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Closed Revenue in ₹ Crores by City (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
              <span className="text-emerald-400 font-bold">₹</span>
              Net Closed Pipeline Yield by City (₹ Crores)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Cumulative commercial value realized after ML classification.
            </p>
          </div>

          <div className="space-y-2.5">
            {REGIONAL_CITY_METRICS.map((city) => (
              <div key={city.place} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300 truncate max-w-[180px]">{city.place.split(',')[0]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">Avg ACV: ₹{city.avgTicketLakhs}L</span>
                    <span className="text-emerald-400 font-bold">₹{city.totalProfitCrores} Cr</span>
                  </div>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${(city.totalProfitCrores / maxProfitCr) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Selected City Deep-Dive Card */}
          <div className="p-4 bg-slate-950 border border-cyan-800/50 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs font-mono">{selectedPlaceMetric.place}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                {selectedPlaceMetric.region}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[9px]">LEAD INVENTORY</span>
                <span className="text-white font-bold">{selectedPlaceMetric.leadCount.toLocaleString()} leads</span>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-slate-400 block text-[9px]">NET REVENUE YIELD</span>
                <span className="text-emerald-400 font-bold">₹{selectedPlaceMetric.totalProfitCrores} Crore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CHART 3 & CHART 4: INDUSTRY ACV IN INR & FUNNEL VELOCITY   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 3: Industry ACV in ₹ Lakhs (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-400" />
                Industry Sector Contract Values (ACV in ₹ Lakhs)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Benchmark deal sizes across 7 enterprise B2B vertical cohorts.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">N = 63,400 Total Leads</span>
          </div>

          <div className="space-y-3">
            {INDUSTRY_PROFILES.map((ind) => {
              const acvLakhs = Math.round((ind.avgContractValue / 100000) * 10) / 10;
              return (
                <div key={ind.industry} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{ind.industry}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-[11px]">Conv: {ind.avgConversionRate}%</span>
                      <span className="text-purple-400 font-bold">₹{acvLakhs} Lakhs</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                      style={{ width: `${(acvLakhs / 40) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 4: Lead Origin & Source Conversion Funnel (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-bold font-mono uppercase text-white flex items-center gap-2">
                <Compass className="h-4 w-4 text-amber-400" />
                Channel Acquisition Conversion Velocity (%)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Win-rates across inbound, partner, paid, and outbound pipelines.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              High-Signal Rank
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { channel: "Lead Add Form (Direct Inbound)", rate: 48.2, tag: "Highest Intent" },
              { channel: "Partner Referral Program", rate: 44.5, tag: "Executive Referral" },
              { channel: "Welingak / Premium Affiliate", rate: 42.1, tag: "Pre-Qualified" },
              { channel: "LinkedIn InMail Campaign", rate: 38.6, tag: "B2B Decision Maker" },
              { channel: "Direct Brand Traffic", rate: 31.4, tag: "Organic Awareness" },
              { channel: "Paid Google Ads", rate: 26.8, tag: "High-Volume Intent" },
              { channel: "Cold Outbound SDR", rate: 18.2, tag: "Low Response Rate" }
            ].map((ch, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">{ch.channel}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{ch.tag}</span>
                    <span className="text-amber-400 font-bold">{ch.rate}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                    style={{ width: `${(ch.rate / 50) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
