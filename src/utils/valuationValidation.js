export function validateComparative(data) {
  return (
    Array.isArray(data?.comparables) &&
    data.comparables.length > 0 &&
    data.comparables.every(
      (c) => typeof c.purchasePrice === "number" && c.purchasePrice > 0
    )
  );
}

export function validateIncome(data) {
  if (!data) return false;
  return (
    data.plotArea > 0 &&
    data.landValueRate > 0 &&
    data.livingArea > 0 &&
    data.rentPerSqm > 0 &&
    data.capitalizationRate > 0 &&
    data.remainingUsefulLife > 0
  );
}

export function validateCost(data) {
  if (!data) return false;
  return (
    data.plotArea > 0 &&
    data.landValueRate > 0 &&
    data.grossFloorArea > 0 &&
    data.standardConstructionCost > 0 &&
    data.totalUsefulLife > 0
  );
}
