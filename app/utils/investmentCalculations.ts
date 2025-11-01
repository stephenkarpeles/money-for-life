export interface InvestmentData {
  year: number;
  age: number;
  invested: number;
  value: number;
}

export function calculateCompoundGrowth(
  annualInvestment: number,
  years: number,
  currentAge: number = 25,
  annualReturn: number = 0.09 // 9% historical average
): InvestmentData[] {
  const data: InvestmentData[] = [];
  
  let totalInvested = 0;
  let portfolioValue = 0;

  // Generate data points for each year
  for (let year = 0; year <= years; year++) {
    // Add this year's investment
    if (year > 0) {
      totalInvested += annualInvestment;
      portfolioValue = (portfolioValue + annualInvestment) * (1 + annualReturn);
    }

    data.push({
      year,
      age: currentAge + year,
      invested: Math.round(totalInvested),
      value: Math.round(portfolioValue),
    });
  }

  return data;
}

export function calculateRetirementMilestones(
  annualInvestment: number,
  annualReturn: number = 0.09
): { years: number; amount: number }[] {
  const milestones = [100000, 250000, 500000, 1000000, 2000000];
  const results: { years: number; amount: number }[] = [];

  let totalInvested = 0;
  let portfolioValue = 0;
  let year = 0;
  let milestoneIndex = 0;

  while (milestoneIndex < milestones.length && year < 80) {
    year++;
    totalInvested += annualInvestment;
    portfolioValue = (portfolioValue + annualInvestment) * (1 + annualReturn);

    if (portfolioValue >= milestones[milestoneIndex]) {
      results.push({
        years: year,
        amount: milestones[milestoneIndex],
      });
      milestoneIndex++;
    }
  }

  return results;
}

