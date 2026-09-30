export interface QuarterlyMarketData {
  quarter: string;
  year: number;
  qtrIndex: number; // 1 to 9
  baselineConv: number;
  championConv: number;
  upliftPercent: number;
  growthRateQoQ: number; // QoQ %
  inquiryVolume: number;
  closedBookings: number;
  avgTicketCrores: number;
  quarterlyProfitCrores: number;
}

export interface CityMarketDetail {
  id: 'bengaluru' | 'mumbai' | 'delhi_ncr';
  name: string;
  shortName: string;
  state: string;
  baselineConv: number;
  championConv: number;
  upliftPercent: number;
  absGainPercent: number;
  avgTicketCrores: number;
  annualProfitCrores: number;
  leadSharePercent: number;
  historicalCAGR: string;
  trendSummary: string;
  quarterlyTrend: QuarterlyMarketData[];
  subMarkets: {
    name: string;
    pincode: string;
    baseline: number;
    champion: number;
    uplift: number;
    avgTicketCrores: number;
    reraApprovedProjects: number;
  }[];
  topDrivers: string[];
  cohortInsight: string;
}
