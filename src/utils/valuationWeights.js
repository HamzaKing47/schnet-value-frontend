// Dynamic weight calculation based on property type and data availability
export function getWeights(propertyType, data) {
  const baseWeights = {
    Condominium: { comparative: 0.6, income: 0.3, cost: 0.1 },
    SingleFamilyHome: { comparative: 0.5, income: 0, cost: 0.5 },
    MultiFamilyBuilding: { comparative: 0.4, income: 0.4, cost: 0.2 },
    Land: { comparative: 1.0, income: 0, cost: 0 },
  };

  // Get base weights for property type
  const weights = { ...baseWeights[propertyType] || { comparative: 0.4, income: 0.4, cost: 0.2 } };

  // Adjust weights based on available data
  if (data) {
    // If comparative data is missing, redistribute weight
    if (!data.comparative || !data.comparative.comparables || data.comparative.comparables.length === 0) {
      const redistribution = (weights.income + weights.cost) > 0 
        ? { 
            income: weights.income / (weights.income + weights.cost) * weights.comparative,
            cost: weights.cost / (weights.income + weights.cost) * weights.comparative
          }
        : { income: 0, cost: 0 };
      
      weights.comparative = 0;
      weights.income += redistribution.income;
      weights.cost += redistribution.cost;
    }

    // If income data is missing, redistribute weight
    if (!data.income || !data.income.livingArea || data.income.livingArea <= 0) {
      const redistribution = (weights.comparative + weights.cost) > 0
        ? {
            comparative: weights.comparative / (weights.comparative + weights.cost) * weights.income,
            cost: weights.cost / (weights.comparative + weights.cost) * weights.income
          }
        : { comparative: 0, cost: 0 };
      
      weights.income = 0;
      weights.comparative += redistribution.comparative;
      weights.cost += redistribution.cost;
    }

    // If cost data is missing, redistribute weight
    if (!data.cost || !data.cost.grossFloorArea || data.cost.grossFloorArea <= 0) {
      const redistribution = (weights.comparative + weights.income) > 0
        ? {
            comparative: weights.comparative / (weights.comparative + weights.income) * weights.cost,
            income: weights.income / (weights.comparative + weights.income) * weights.cost
          }
        : { comparative: 0, income: 0 };
      
      weights.cost = 0;
      weights.comparative += redistribution.comparative;
      weights.income += redistribution.income;
    }
  }

  // Normalize to sum to 1
  const total = weights.comparative + weights.income + weights.cost;
  if (total > 0) {
    weights.comparative = weights.comparative / total;
    weights.income = weights.income / total;
    weights.cost = weights.cost / total;
  }

  return weights;
}

// Confidence indicator for UX / reports
export function calculateConfidence(result) {
  let score = 0;
  const { breakdown, inputData } = result;

  // Base score from available methods
  if (breakdown?.comparativeValue) score += 40;
  if (breakdown?.incomeValue) score += 35;
  if (breakdown?.costValue) score += 25;

  // Quality adjustments
  if (inputData?.comparative?.comparables?.length >= 3) score += 10;
  if (inputData?.comparative?.comparables?.length >= 5) score += 5;

  // Normalize score to 0-100
  score = Math.min(score, 100);

  if (score >= 80) return "High";
  if (score >= 60) return "Medium-High";
  if (score >= 40) return "Medium";
  if (score >= 20) return "Low-Medium";
  return "Low";
}

// Get recommended next steps based on confidence
export function getRecommendations(result) {
  const confidence = calculateConfidence(result);
  const { inputData } = result;

  const recommendations = [];

  if (confidence === "Low") {
    recommendations.push("Fügen Sie mehr Vergleichsobjekte hinzu");
    recommendations.push("Vervollständigen Sie die Ertrags- oder Sachwertdaten");
    recommendations.push("Konsultieren Sie einen Experten für eine detaillierte Bewertung");
  } else if (confidence === "Medium") {
    recommendations.push("Ergänzen Sie weitere Vergleichsobjekte für höhere Genauigkeit");
    recommendations.push("Überprüfen Sie die Eingabedaten auf Vollständigkeit");
  } else if (confidence === "Medium-High") {
    recommendations.push("Die Bewertung ist gut - für höchste Genauigkeit alle drei Verfahren verwenden");
  } else {
    recommendations.push("Umfassende Bewertung mit hoher Aussagekraft erreicht");
  }

  // Specific recommendations based on missing data
  if (!inputData?.comparative || inputData.comparative.comparables?.length < 2) {
    recommendations.push("Mindestens 2-3 Vergleichsobjekte für aussagekräftige Ergebnisse");
  }

  if (["Condominium", "MultiFamilyBuilding"].includes(inputData.propertyType) && !inputData?.income) {
    recommendations.push("Ertragswertverfahren für vermietete Objekte empfohlen");
  }

  return recommendations;
}