import { CityMarketDetail } from '../types/market';

export const HISTORICAL_QUARTERS = [
  "2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4",
  "2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4",
  "2026 Q1"
];

export const CITY_MARKET_PROFILES_EXTENDED: Record<'bengaluru' | 'mumbai' | 'delhi_ncr', CityMarketDetail> = {
  bengaluru: {
    id: "bengaluru",
    name: "Bengaluru (Silicon Plateau & Tech Corridors)",
    shortName: "Bengaluru",
    state: "Karnataka",
    baselineConv: 16.4,
    championConv: 27.8,
    upliftPercent: 69.5,
    absGainPercent: 11.4,
    avgTicketCrores: 1.45,
    annualProfitCrores: 14.85,
    leadSharePercent: 32,
    historicalCAGR: "+18.4% 9-Qtr CAGR",
    trendSummary: "Consistent tech-corridor expansion across Outer Ring Road and Whitefield. Champion model adoption in early 2024 propelled conversion velocity from 19.8% to 27.8% as IT salary hikes and pre-sanction letters decoupled buyer conversion from general macroeconomic rate cycles.",
    quarterlyTrend: [
      { quarter: "2024 Q1", year: 2024, qtrIndex: 1, baselineConv: 14.2, championConv: 19.8, upliftPercent: 39.4, growthRateQoQ: 5.2, inquiryVolume: 3200, closedBookings: 633, avgTicketCrores: 1.30, quarterlyProfitCrores: 2.85 },
      { quarter: "2024 Q2", year: 2024, qtrIndex: 2, baselineConv: 14.5, championConv: 21.0, upliftPercent: 44.8, growthRateQoQ: 6.1, inquiryVolume: 3450, closedBookings: 724, avgTicketCrores: 1.32, quarterlyProfitCrores: 3.10 },
      { quarter: "2024 Q3", year: 2024, qtrIndex: 3, baselineConv: 14.8, championConv: 22.4, upliftPercent: 51.4, growthRateQoQ: 6.7, inquiryVolume: 3600, closedBookings: 806, avgTicketCrores: 1.35, quarterlyProfitCrores: 3.35 },
      { quarter: "2024 Q4", year: 2024, qtrIndex: 4, baselineConv: 15.2, championConv: 23.9, upliftPercent: 57.2, growthRateQoQ: 6.7, inquiryVolume: 4100, closedBookings: 980, avgTicketCrores: 1.38, quarterlyProfitCrores: 3.90 },
      { quarter: "2025 Q1", year: 2025, qtrIndex: 5, baselineConv: 15.5, championConv: 24.8, upliftPercent: 60.0, growthRateQoQ: 3.8, inquiryVolume: 4250, closedBookings: 1054, avgTicketCrores: 1.40, quarterlyProfitCrores: 4.10 },
      { quarter: "2025 Q2", year: 2025, qtrIndex: 6, baselineConv: 15.9, championConv: 25.9, upliftPercent: 62.9, growthRateQoQ: 4.4, inquiryVolume: 4400, closedBookings: 1140, avgTicketCrores: 1.42, quarterlyProfitCrores: 4.35 },
      { quarter: "2025 Q3", year: 2025, qtrIndex: 7, baselineConv: 16.1, championConv: 26.7, upliftPercent: 65.8, growthRateQoQ: 3.1, inquiryVolume: 4600, closedBookings: 1228, avgTicketCrores: 1.43, quarterlyProfitCrores: 4.60 },
      { quarter: "2025 Q4", year: 2025, qtrIndex: 8, baselineConv: 16.2, championConv: 27.2, upliftPercent: 67.9, growthRateQoQ: 1.9, inquiryVolume: 4900, closedBookings: 1333, avgTicketCrores: 1.45, quarterlyProfitCrores: 4.80 },
      { quarter: "2026 Q1", year: 2026, qtrIndex: 9, baselineConv: 16.4, championConv: 27.8, upliftPercent: 69.5, growthRateQoQ: 2.2, inquiryVolume: 5100, closedBookings: 1418, avgTicketCrores: 1.45, quarterlyProfitCrores: 4.95 }
    ],
    subMarkets: [
      { name: "Whitefield (ITPL Corridor)", pincode: "560066", baseline: 17.1, champion: 29.4, uplift: 71.9, avgTicketCrores: 1.35, reraApprovedProjects: 142 },
      { name: "Electronic City (Phase 1/2)", pincode: "560100", baseline: 15.2, champion: 26.2, uplift: 72.4, avgTicketCrores: 0.95, reraApprovedProjects: 98 },
      { name: "Indiranagar / Old Airport Rd", pincode: "560038", baseline: 18.5, champion: 31.0, uplift: 67.6, avgTicketCrores: 2.85, reraApprovedProjects: 45 },
      { name: "Sarjapur / Bellandur Ring Rd", pincode: "560103", baseline: 16.0, champion: 27.5, uplift: 71.9, avgTicketCrores: 1.55, reraApprovedProjects: 118 }
    ],
    topDrivers: [
      "Commute Distance to Tech Hubs (<6 km drives 2.4x booking velocity)",
      "SBI/HDFC Pre-Sanction letter (78% tech buyers have salaried pre-approval)",
      "Vastu Compliance for 3BHK East-facing Pooja configurations"
    ],
    cohortInsight: "High concentration of salaried tech professionals with stable IT incomes. The champion model detects verified pre-sanctions to prioritize physical site inspections on weekends, minimizing wasted weekday executive visits."
  },
  mumbai: {
    id: "mumbai",
    name: "Mumbai-MMR (Financial Capital & Coastal Belts)",
    shortName: "Mumbai-MMR",
    state: "Maharashtra",
    baselineConv: 14.8,
    championConv: 25.1,
    upliftPercent: 69.6,
    absGainPercent: 10.3,
    avgTicketCrores: 2.40,
    annualProfitCrores: 15.90,
    leadSharePercent: 28,
    historicalCAGR: "+19.6% 9-Qtr CAGR",
    trendSummary: "MahaRERA regulatory rigour combined with high ticket sizes (₹2.40 Cr). Conversion jumped from 17.5% in 2024 Q1 to 25.1% in 2026 Q1 as AI screening eliminated unqualified inquiries, safeguarding relationship manager bandwidth for high-net-worth HNIs.",
    quarterlyTrend: [
      { quarter: "2024 Q1", year: 2024, qtrIndex: 1, baselineConv: 12.8, championConv: 17.5, upliftPercent: 36.7, growthRateQoQ: 4.8, inquiryVolume: 2800, closedBookings: 490, avgTicketCrores: 2.20, quarterlyProfitCrores: 2.90 },
      { quarter: "2024 Q2", year: 2024, qtrIndex: 2, baselineConv: 13.0, championConv: 18.6, upliftPercent: 43.1, growthRateQoQ: 6.3, inquiryVolume: 2950, closedBookings: 549, avgTicketCrores: 2.25, quarterlyProfitCrores: 3.20 },
      { quarter: "2024 Q3", year: 2024, qtrIndex: 3, baselineConv: 13.4, championConv: 19.9, upliftPercent: 48.5, growthRateQoQ: 7.0, inquiryVolume: 3100, closedBookings: 617, avgTicketCrores: 2.30, quarterlyProfitCrores: 3.65 },
      { quarter: "2024 Q4", year: 2024, qtrIndex: 4, baselineConv: 13.7, championConv: 21.2, upliftPercent: 54.7, growthRateQoQ: 6.5, inquiryVolume: 3500, closedBookings: 742, avgTicketCrores: 2.35, quarterlyProfitCrores: 4.15 },
      { quarter: "2025 Q1", year: 2025, qtrIndex: 5, baselineConv: 14.0, championConv: 22.1, upliftPercent: 57.9, growthRateQoQ: 4.2, inquiryVolume: 3650, closedBookings: 807, avgTicketCrores: 2.38, quarterlyProfitCrores: 4.40 },
      { quarter: "2025 Q2", year: 2025, qtrIndex: 6, baselineConv: 14.2, championConv: 23.0, upliftPercent: 62.0, growthRateQoQ: 4.1, inquiryVolume: 3800, closedBookings: 874, avgTicketCrores: 2.40, quarterlyProfitCrores: 4.75 },
      { quarter: "2025 Q3", year: 2025, qtrIndex: 7, baselineConv: 14.4, championConv: 23.9, upliftPercent: 66.0, growthRateQoQ: 3.9, inquiryVolume: 3950, closedBookings: 944, avgTicketCrores: 2.40, quarterlyProfitCrores: 5.05 },
      { quarter: "2025 Q4", year: 2025, qtrIndex: 8, baselineConv: 14.6, championConv: 24.5, upliftPercent: 67.8, growthRateQoQ: 2.5, inquiryVolume: 4200, closedBookings: 1029, avgTicketCrores: 2.40, quarterlyProfitCrores: 5.30 },
      { quarter: "2026 Q1", year: 2026, qtrIndex: 9, baselineConv: 14.8, championConv: 25.1, upliftPercent: 69.6, growthRateQoQ: 2.4, inquiryVolume: 4350, closedBookings: 1092, avgTicketCrores: 2.40, quarterlyProfitCrores: 5.45 }
    ],
    subMarkets: [
      { name: "BKC / Bandra East", pincode: "400051", baseline: 15.9, champion: 27.6, uplift: 73.6, avgTicketCrores: 4.20, reraApprovedProjects: 52 },
      { name: "Powai Hiranandani Corridor", pincode: "400076", baseline: 15.2, champion: 25.8, uplift: 69.7, avgTicketCrores: 2.60, reraApprovedProjects: 68 },
      { name: "Thane West (Ghodbunder Rd)", pincode: "400601", baseline: 13.8, champion: 23.4, uplift: 69.6, avgTicketCrores: 1.15, reraApprovedProjects: 174 },
      { name: "Lower Parel / Worli Luxury", pincode: "400013", baseline: 14.2, champion: 24.5, uplift: 72.5, avgTicketCrores: 5.80, reraApprovedProjects: 38 }
    ],
    topDrivers: [
      "MahaRERA Audit Clearance (zero delayed projects past 6 months)",
      "CIBIL Score 750+ (strict screening required for ₹2 Cr+ ticket sizes)",
      "Carpet Area RERA Transparency vs Super-Built-Up Ratios"
    ],
    cohortInsight: "Highest average ticket size in India (₹2.40 Cr). Buyers are risk-averse corporate leaders, business owners, and NRI investors. Champion model filters out aspirational inquiries that fail high down-payment requirements."
  },
  delhi_ncr: {
    id: "delhi_ncr",
    name: "Delhi-NCR (Gurugram Millennium Hub & Noida Expressway)",
    shortName: "Delhi-NCR",
    state: "Haryana / UP / Delhi",
    baselineConv: 15.2,
    championConv: 24.9,
    upliftPercent: 63.8,
    absGainPercent: 9.7,
    avgTicketCrores: 1.85,
    annualProfitCrores: 9.10,
    leadSharePercent: 24,
    historicalCAGR: "+17.2% 9-Qtr CAGR",
    trendSummary: "Broker-heavy market dynamics. Transitioning Channel Partners from speculative pre-launches to Haryana-RERA vetted luxury corridors in Golf Course Extension and Dwarka Expressway lifted quarterly conversions from 17.9% to 24.9%.",
    quarterlyTrend: [
      { quarter: "2024 Q1", year: 2024, qtrIndex: 1, baselineConv: 13.2, championConv: 17.9, upliftPercent: 35.6, growthRateQoQ: 4.5, inquiryVolume: 2500, closedBookings: 448, avgTicketCrores: 1.65, quarterlyProfitCrores: 1.70 },
      { quarter: "2024 Q2", year: 2024, qtrIndex: 2, baselineConv: 13.5, championConv: 18.9, upliftPercent: 40.0, growthRateQoQ: 5.6, inquiryVolume: 2650, closedBookings: 501, avgTicketCrores: 1.70, quarterlyProfitCrores: 1.95 },
      { quarter: "2024 Q3", year: 2024, qtrIndex: 3, baselineConv: 13.8, championConv: 20.0, upliftPercent: 44.9, growthRateQoQ: 5.8, inquiryVolume: 2800, closedBookings: 560, avgTicketCrores: 1.75, quarterlyProfitCrores: 2.15 },
      { quarter: "2024 Q4", year: 2024, qtrIndex: 4, baselineConv: 14.1, championConv: 21.1, upliftPercent: 49.6, growthRateQoQ: 5.5, inquiryVolume: 3200, closedBookings: 675, avgTicketCrores: 1.80, quarterlyProfitCrores: 2.50 },
      { quarter: "2025 Q1", year: 2025, qtrIndex: 5, baselineConv: 14.4, championConv: 21.9, upliftPercent: 52.1, growthRateQoQ: 3.8, inquiryVolume: 3300, closedBookings: 723, avgTicketCrores: 1.82, quarterlyProfitCrores: 2.65 },
      { quarter: "2025 Q2", year: 2025, qtrIndex: 6, baselineConv: 14.6, championConv: 22.8, upliftPercent: 56.2, growthRateQoQ: 4.1, inquiryVolume: 3450, closedBookings: 787, avgTicketCrores: 1.85, quarterlyProfitCrores: 2.85 },
      { quarter: "2025 Q3", year: 2025, qtrIndex: 7, baselineConv: 14.8, championConv: 23.6, upliftPercent: 59.5, growthRateQoQ: 3.5, inquiryVolume: 3600, closedBookings: 850, avgTicketCrores: 1.85, quarterlyProfitCrores: 3.05 },
      { quarter: "2025 Q4", year: 2025, qtrIndex: 8, baselineConv: 15.0, championConv: 24.2, upliftPercent: 61.3, growthRateQoQ: 2.5, inquiryVolume: 3800, closedBookings: 920, avgTicketCrores: 1.85, quarterlyProfitCrores: 3.20 },
      { quarter: "2026 Q1", year: 2026, qtrIndex: 9, baselineConv: 15.2, championConv: 24.9, upliftPercent: 63.8, growthRateQoQ: 2.9, inquiryVolume: 4000, closedBookings: 996, avgTicketCrores: 1.85, quarterlyProfitCrores: 3.35 }
    ],
    subMarkets: [
      { name: "Gurugram Golf Course Ext.", pincode: "122002", baseline: 16.5, champion: 27.2, uplift: 64.8, avgTicketCrores: 2.90, reraApprovedProjects: 86 },
      { name: "Noida Sec 62 / Expressway", pincode: "201301", baseline: 14.4, champion: 23.8, uplift: 65.3, avgTicketCrores: 1.25, reraApprovedProjects: 112 },
      { name: "Dwarka Expressway Corridor", pincode: "122006", baseline: 15.0, champion: 24.6, uplift: 64.0, avgTicketCrores: 1.75, reraApprovedProjects: 94 },
      { name: "New Gurugram (NH-48 Belts)", pincode: "122004", baseline: 14.8, champion: 24.1, uplift: 62.8, avgTicketCrores: 1.40, reraApprovedProjects: 76 }
    ],
    topDrivers: [
      "Channel Partner (CP) Institutional Tier (65% transactions driven by brokers)",
      "Possession Timeline Risk (HRERA/UP-RERA litigation-free status mandatory)",
      "Dwarka Expressway infrastructure connectivity to IGI Airport"
    ],
    cohortInsight: "Heavy Channel Partner broker-driven market. AI scoring prioritizes high-reputation institutional broker referrals and verifies developer litigation records on Haryana RERA before dispatching sales managers."
  }
};
