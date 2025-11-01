// 2025 Tax Brackets and Rates
// Note: These are hardcoded for 2025. In production, consider using a tax API service
// such as TaxJar API or Tax Rate API for automatic updates

export interface TaxResult {
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  netIncome: number;
  effectiveTaxRate: number;
}

// 2025 Federal Tax Brackets (Single Filer)
const federalBrackets2025Single = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

// 2025 Standard Deduction
const standardDeduction2025 = {
  single: 14600,
  marriedJoint: 29200,
  headOfHousehold: 21900,
};

// Child Tax Credit (simplified)
const childTaxCredit = 2000;

// State tax rates (simplified flat rates for demonstration)
// In reality, many states have progressive brackets
const stateTaxRates: { [key: string]: number } = {
  "Alabama": 0.05,
  "Alaska": 0.00,
  "Arizona": 0.025,
  "Arkansas": 0.045,
  "California": 0.093, // Top rate, simplified
  "Colorado": 0.044,
  "Connecticut": 0.0699,
  "Delaware": 0.066,
  "Florida": 0.00,
  "Georgia": 0.0575,
  "Hawaii": 0.11, // Top rate
  "Idaho": 0.058,
  "Illinois": 0.0495,
  "Indiana": 0.0323,
  "Iowa": 0.06,
  "Kansas": 0.057,
  "Kentucky": 0.04,
  "Louisiana": 0.0425,
  "Maine": 0.0715,
  "Maryland": 0.0575,
  "Massachusetts": 0.05,
  "Michigan": 0.0425,
  "Minnesota": 0.0985,
  "Mississippi": 0.05,
  "Missouri": 0.048,
  "Montana": 0.0675,
  "Nebraska": 0.0684,
  "Nevada": 0.00,
  "New Hampshire": 0.00, // Only dividends/interest
  "New Jersey": 0.1075,
  "New Mexico": 0.059,
  "New York": 0.109,
  "North Carolina": 0.0475,
  "North Dakota": 0.029,
  "Ohio": 0.0385,
  "Oklahoma": 0.0475,
  "Oregon": 0.099,
  "Pennsylvania": 0.0307,
  "Rhode Island": 0.0599,
  "South Carolina": 0.065,
  "South Dakota": 0.00,
  "Tennessee": 0.00,
  "Texas": 0.00,
  "Utah": 0.0465,
  "Vermont": 0.0875,
  "Virginia": 0.0575,
  "Washington": 0.00,
  "West Virginia": 0.065,
  "Wisconsin": 0.0765,
  "Wyoming": 0.00,
};

export function calculateTaxes(
  grossIncome: number,
  dependents: number,
  state: string
): TaxResult {
  // Calculate taxable income
  const standardDeduction = standardDeduction2025.single;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction);

  // Calculate federal tax
  let federalTax = 0;
  for (const bracket of federalBrackets2025Single) {
    if (taxableIncome > bracket.min) {
      const taxableInBracket = Math.min(
        taxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      federalTax += taxableInBracket * bracket.rate;
    }
  }

  // Apply child tax credit
  const taxCredit = Math.min(federalTax, dependents * childTaxCredit);
  federalTax = Math.max(0, federalTax - taxCredit);

  // Calculate FICA taxes
  // Social Security: 6.2% up to $168,600 (2025 limit)
  const socialSecurityWageBase = 168600;
  const socialSecurity = Math.min(grossIncome, socialSecurityWageBase) * 0.062;

  // Medicare: 1.45% on all income, plus 0.9% on income over $200,000
  const medicareThreshold = 200000;
  let medicare = grossIncome * 0.0145;
  if (grossIncome > medicareThreshold) {
    medicare += (grossIncome - medicareThreshold) * 0.009;
  }

  // Calculate state tax
  const stateRate = stateTaxRates[state] || 0;
  const stateTax = taxableIncome * stateRate;

  // Calculate totals
  const totalTax = federalTax + stateTax + socialSecurity + medicare;
  const netIncome = grossIncome - totalTax;
  const effectiveTaxRate = (totalTax / grossIncome) * 100;

  return {
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    totalTax,
    netIncome,
    effectiveTaxRate,
  };
}

export function getStatesList(): string[] {
  return Object.keys(stateTaxRates).sort();
}

