export function validateStep(step, data) {
  const errors = {};

  switch (step) {
    case 0: // StepOne
      if (!data.propertyType) {
        errors.propertyType = "Bitte wählen Sie einen Objekttyp aus";
      }
      if (data.spf && isNaN(data.spf)) {
        errors.spf = "SPF muss eine gültige Zahl sein";
      }
      break;

    case 1: // StepComparative
      if (data.propertyType !== "Land") {
        const comparables = data?.comparative?.comparables || [];
        if (comparables.length === 0) {
          errors.comparatives = "Mindestens eine Vergleichsimmobilie erforderlich";
        } else {
          comparables.forEach((comp, index) => {
            if (!comp.purchasePrice || comp.purchasePrice <= 0) {
              errors[`comp_${index}_price`] = "Kaufpreis muss größer als 0 sein";
            }
          });
        }
      }
      break;

    case 2: // StepIncome
      if (["Condominium", "MultiFamilyBuilding"].includes(data.propertyType)) {
        if (!data.income?.livingArea || data.income.livingArea <= 0) {
          errors.livingArea = "Wohnfläche muss größer als 0 sein";
        }
        if (!data.income?.rentPerSqm || data.income.rentPerSqm <= 0) {
          errors.rentPerSqm = "Miete pro m² muss größer als 0 sein";
        }
        if (!data.income?.capitalizationRate || data.income.capitalizationRate <= 0) {
          errors.capitalizationRate = "Kapitalisierungszinssatz muss größer als 0 sein";
        }
      }
      break;

    case 3: // StepCost
      // Apply validation for ALL property types except Land
      if (data.propertyType !== "Land") {
        // Make these fields optional - only validate if user enters values
        if (data.cost?.grossFloorArea && data.cost.grossFloorArea <= 0) {
          errors.grossFloorArea = "Bruttogrundfläche muss größer als 0 sein";
        }
        if (data.cost?.standardConstructionCost && data.cost.standardConstructionCost <= 0) {
          errors.standardConstructionCost = "Standardherstellungskosten müssen größer als 0 sein";
        }
      }
      break;
  }

  return errors;
}

export function canProceedToNextStep(step, data) {
  // For Step 3 (Cost), always allow proceeding because it's optional
  if (step === 3 && data.propertyType !== "Land") {
    return true;
  }
  
  const errors = validateStep(step, data);
  return Object.keys(errors).length === 0;
}

export function isComparativeValid(data) {
  return (
    data?.comparative?.comparables?.length > 0 &&
    data.comparative.comparables.every(
      (c) => typeof c.purchasePrice === "number" && c.purchasePrice > 0
    )
  );
}

export function isIncomeValid(data) {
  return (
    data?.income &&
    data.income.livingArea > 0 &&
    data.income.rentPerSqm > 0 &&
    data.income.capitalizationRate > 0
  );
}

export function isCostValid(data) {
  // Cost method is optional - return true if no data or if data is valid
  if (!data?.cost) return true;
  
  // If user entered data, check it's valid
  if (data.cost.grossFloorArea > 0 || data.cost.standardConstructionCost > 0) {
    return (
      data.cost.grossFloorArea > 0 &&
      data.cost.standardConstructionCost > 0
    );
  }
  
  // No data entered is also valid (optional method)
  return true;
}