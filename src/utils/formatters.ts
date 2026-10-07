// Formatting utilities for Indian Rupee (INR ₹) and Geographic Places

/**
 * Format a number into Indian Rupee (INR ₹)
 * Supports full string (₹15,40,000), compact (₹15.4L, ₹4.82Cr), or raw formatted
 */
export function formatInr(
  amount: number, 
  mode: 'full' | 'compact' | 'lakhs_crores' = 'full'
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (mode === 'compact') {
    if (absAmount >= 10000000) {
      // 1 Crore = 10,000,000
      const cr = (absAmount / 10000000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${cr} Cr`;
    } else if (absAmount >= 100000) {
      // 1 Lakh = 100,000
      const l = (absAmount / 100000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${l} L`;
    } else if (absAmount >= 1000) {
      const k = (absAmount / 1000).toFixed(1);
      return `${isNegative ? '-' : ''}₹${k}k`;
    }
    return `${isNegative ? '-' : ''}₹${Math.round(absAmount).toLocaleString('en-IN')}`;
  }

  if (mode === 'lakhs_crores') {
    if (absAmount >= 10000000) {
      const cr = (absAmount / 10000000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${cr} Crore`;
    } else if (absAmount >= 100000) {
      const l = (absAmount / 100000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${l} Lakh`;
    }
  }

  // Full Indian number formatting (e.g. 15,40,000)
  return `${isNegative ? '-' : ''}₹${Math.round(absAmount).toLocaleString('en-IN')}`;
}

/**
 * Format places with territory regions
 */
export interface PlaceLocation {
  city: string;
  stateOrCountry: string;
  region: string;
  display: string;
}

export const PLACE_LOCATIONS: Record<string, PlaceLocation> = {
  'Bengaluru': { city: 'Bengaluru', stateOrCountry: 'Karnataka, India', region: 'India Tech Hubs', display: 'Bengaluru, Karnataka (India Tech Hubs)' },
  'Hyderabad': { city: 'Hyderabad', stateOrCountry: 'Telangana, India', region: 'India Tech Hubs', display: 'Hyderabad, Telangana (India Tech Hubs)' },
  'Mumbai': { city: 'Mumbai', stateOrCountry: 'Maharashtra, India', region: 'India Tech Hubs', display: 'Mumbai, Maharashtra (India Tech Hubs)' },
  'Gurugram': { city: 'Gurugram', stateOrCountry: 'Haryana, India', region: 'India Tech Hubs', display: 'Gurugram, Haryana (India Tech Hubs)' },
  'Pune': { city: 'Pune', stateOrCountry: 'Maharashtra, India', region: 'India Tech Hubs', display: 'Pune, Maharashtra (India Tech Hubs)' },
  'San Francisco': { city: 'San Francisco', stateOrCountry: 'California, US', region: 'North America', display: 'San Francisco, CA (North America)' },
  'New York': { city: 'New York', stateOrCountry: 'New York, US', region: 'North America', display: 'New York, NY (North America)' },
  'Seattle': { city: 'Seattle', stateOrCountry: 'Washington, US', region: 'North America', display: 'Seattle, WA (North America)' },
  'Austin': { city: 'Austin', stateOrCountry: 'Texas, US', region: 'North America', display: 'Austin, TX (North America)' },
  'London': { city: 'London', stateOrCountry: 'Greater London, UK', region: 'EMEA & UK', display: 'London, UK (EMEA & UK)' },
  'Dublin': { city: 'Dublin', stateOrCountry: 'Leinster, Ireland', region: 'EMEA & UK', display: 'Dublin, Ireland (EMEA & UK)' },
  'Berlin': { city: 'Berlin', stateOrCountry: 'Brandenburg, Germany', region: 'EMEA & UK', display: 'Berlin, Germany (EMEA & UK)' },
  'Singapore': { city: 'Singapore', stateOrCountry: 'Central Region, SG', region: 'APAC Growth', display: 'Singapore (APAC Growth)' },
  'Tokyo': { city: 'Tokyo', stateOrCountry: 'Kanto, Japan', region: 'APAC Growth', display: 'Tokyo, Japan (APAC Growth)' },
  'Sydney': { city: 'Sydney', stateOrCountry: 'NSW, Australia', region: 'APAC Growth', display: 'Sydney, Australia (APAC Growth)' },
  'São Paulo': { city: 'São Paulo', stateOrCountry: 'SP, Brazil', region: 'LATAM', display: 'São Paulo, Brazil (LATAM)' }
};
