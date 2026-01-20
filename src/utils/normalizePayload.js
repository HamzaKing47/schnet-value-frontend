export const normalizePayload = (data) => {
  const livingArea = Number(data.livingArea);

  return {
    propertyType: data.propertyType,

    comparative: {
      comparables: [
        {
          purchasePrice: Number(data.purchasePrice),
          afLocation: 1.05,
          afSize: 1,
          afCondition: 1.1,
          afEquipment: 1,
          afTime: 1,
        },
      ],
    },

    income: {
      plotArea: 0,
      landValueRate: 400,
      livingArea,
      rentPerSqm: Number(data.rentPerSqm),
      capitalizationRate: 0.035,
      operatingCosts: {
        administration: 300,
        maintenancePerSqm: 10,
        vacancyRate: 0.03,
      },
      remainingUsefulLife: 50,
      marketAdjustmentFactor: 1,
    },

    cost: {
      plotArea: 0,
      landValueRate: 400,
      grossFloorArea: livingArea,
      standardConstructionCost: 900,
      constructionIndexCurrent: 160,
      constructionIndexBase: 100,
      age: 20,
      totalUsefulLife: 80,
      externalFacilitiesRate: 0.04,
      marketAdjustmentFactor: 1,
    },

    spf: -10000,
  };
};
