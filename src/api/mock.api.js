// Mock API responses for testing when backend isn't fully implemented
export const mockMarketValue = async (payload) => {
  console.log("Using mock API with payload:", payload);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate mock values based on input
  let comparativeValue = 0;
  let incomeValue = 0;
  let costValue = 0;
  
  // Mock comparative value
  if (payload.comparative?.comparables?.length > 0) {
    const comps = payload.comparative.comparables;
    const total = comps.reduce((sum, comp) => sum + (comp.purchasePrice || 0), 0);
    comparativeValue = Math.round(total / comps.length);
  }
  
  // Mock income value
  if (payload.income?.livingArea && payload.income?.rentPerSqm) {
    const annualRent = payload.income.livingArea * payload.income.rentPerSqm * 12;
    const annualCosts = (payload.income.operatingCosts?.administration || 0) +
                      (payload.income.livingArea * (payload.income.operatingCosts?.maintenancePerSqm || 0)) +
                      (annualRent * (payload.income.operatingCosts?.vacancyRate || 0));
    const netIncome = annualRent - annualCosts;
    incomeValue = Math.round(netIncome / (payload.income.capitalizationRate || 0.035));
  }
  
  // Mock cost value
  if (payload.cost?.grossFloorArea && payload.cost?.standardConstructionCost) {
    const landValue = (payload.cost.plotArea || 0) * (payload.cost.landValueRate || 400);
    const buildingCost = payload.cost.grossFloorArea * payload.cost.standardConstructionCost;
    const ageFactor = Math.max(0, 1 - ((payload.cost.age || 0) / (payload.cost.totalUsefulLife || 80)));
    const buildingValue = buildingCost * ageFactor;
    const externalValue = buildingValue * (payload.cost.externalFacilitiesRate || 0.04);
    costValue = Math.round((landValue + buildingValue + externalValue) * (payload.cost.marketAdjustmentFactor || 1));
  }
  
  // Calculate weighted market value
  const weights = payload.weights || { comparative: 0, income: 0, cost: 0 };
  const marketValue = Math.round(
    (comparativeValue * weights.comparative) +
    (incomeValue * weights.income) +
    (costValue * weights.cost)
  );
  
  return {
    marketValue: marketValue > 0 ? marketValue : 350000, // Fallback to 350,000 if 0
    breakdown: {
      comparativeValue: comparativeValue > 0 ? comparativeValue : 320000,
      incomeValue: incomeValue > 0 ? incomeValue : 380000,
      costValue: costValue > 0 ? costValue : 340000,
    },
    method: "Market Value (ImmoWertV) - Mock Data",
    spf: payload.spf || 0,
    weights: payload.weights || { comparative: 0, income: 0, cost: 0 },
  };
};

export const mockHealthCheck = async () => {
  return { status: "OK", message: "Mock API is running" };
};