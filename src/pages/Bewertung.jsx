import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import StepOne from "../components/bewertung/StepOne";
import StepComparative from "../components/bewertung/StepComparative";
import StepIncome from "../components/bewertung/StepIncome";
import StepCost from "../components/bewertung/StepCost";
import Result from "../components/bewertung/Result";
import { marketValue } from "../api/valuation.api";
import { validateStep, canProceedToNextStep } from "../utils/stepValidation";

// Define comprehensive initial data with all required fields
const INITIAL_INCOME = {
  plotArea: 0,
  landValueRate: 400,
  livingArea: 0,
  rentPerSqm: 0,
  capitalizationRate: 0.035,
  remainingUsefulLife: 50,
  marketAdjustmentFactor: 1.0,
  operatingCosts: {
    administration: 300,
    maintenancePerSqm: 10,
    vacancyRate: 0.03,
  },
};

const INITIAL_COST = {
  plotArea: 0,
  landValueRate: 400,
  grossFloorArea: 0,
  standardConstructionCost: 870,
  constructionIndexCurrent: 160,
  constructionIndexBase: 100,
  age: 20,
  totalUsefulLife: 80,
  externalFacilitiesRate: 0.04,
  marketAdjustmentFactor: 1.0,
};

const INITIAL_COMPARABLE = {
  purchasePrice: 0,
  afLocation: 1.0,
  afSize: 1.0,
  afCondition: 1.0,
  afEquipment: 1.0,
  afTime: 1.0,
};

const INITIAL_DATA = {
  propertyType: "Condominium",
  comparative: {
    comparables: [{ ...INITIAL_COMPARABLE }]
  },
  income: { ...INITIAL_INCOME },
  cost: { ...INITIAL_COST },
  spf: -10000,
};

const STEPS = {
  OBJECT: 0,
  COMPARATIVE: 1,
  INCOME: 2,
  COST: 3,
  RESULT: 4,
};

export default function Bewertung() {
  const [data, setData] = useState(() => ({ ...INITIAL_DATA }));
  const [currentStep, setCurrentStep] = useState(STEPS.OBJECT);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  // Determine which steps are applicable based on property type
  const applicableSteps = getApplicableSteps(data.propertyType);

  // Update progress
  useEffect(() => {
    const totalSteps = applicableSteps.length + 1;
    const completedSteps = currentStep;
    setProgress(Math.round((completedSteps / totalSteps) * 100));
  }, [currentStep, applicableSteps]);

  // Fix for step navigation
  useEffect(() => {
    if (currentStep > STEPS.RESULT) {
      setCurrentStep(STEPS.RESULT);
    }
  }, [currentStep]);

  const validateCurrentStep = () => {
    const stepErrors = validateStep(currentStep, data);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    // If this is the last applicable step, calculate valuation
    if (currentStep === applicableSteps[applicableSteps.length - 1]) {
      calculateValuation();
    } else {
      // Move to next applicable step
      const nextStepIndex = applicableSteps.findIndex(step => step > currentStep);
      if (nextStepIndex !== -1) {
        setCurrentStep(applicableSteps[nextStepIndex]);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.OBJECT) return;
    
    const prevStepIndex = applicableSteps.findIndex(step => step === currentStep);
    if (prevStepIndex > 0) {
      setCurrentStep(applicableSteps[prevStepIndex - 1]);
    } else {
      setCurrentStep(STEPS.OBJECT);
    }
  };

  const calculateValuation = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Clean and format data for API
      const payload = {
        propertyType: data.propertyType,
        spf: data.spf || 0,
        weights: {
          comparative: data.comparative?.comparables?.length > 0 ? 0.4 : 0,
          income: data.income?.livingArea > 0 && data.income?.rentPerSqm > 0 ? 0.4 : 0,
          cost: data.cost?.grossFloorArea > 0 && data.cost?.standardConstructionCost > 0 ? 0.2 : 0,
        },
      };

      // Add comparative data if available
      if (data.comparative?.comparables?.length > 0) {
        const validComparables = data.comparative.comparables.filter(
          comp => comp.purchasePrice > 0
        );
        
        if (validComparables.length > 0) {
          payload.comparative = {
            comparables: validComparables.map(comp => ({
              purchasePrice: Number(comp.purchasePrice) || 0,
              afLocation: Number(comp.afLocation) || 1.0,
              afSize: Number(comp.afSize) || 1.0,
              afCondition: Number(comp.afCondition) || 1.0,
              afEquipment: Number(comp.afEquipment) || 1.0,
              afTime: Number(comp.afTime) || 1.0,
            }))
          };
        }
      }

      // Add income data if available
      if (data.income && data.income.livingArea > 0 && data.income.rentPerSqm > 0) {
        payload.income = {
          plotArea: Number(data.income.plotArea) || 0,
          landValueRate: Number(data.income.landValueRate) || 400,
          livingArea: Number(data.income.livingArea),
          rentPerSqm: Number(data.income.rentPerSqm),
          capitalizationRate: Number(data.income.capitalizationRate) || 0.035,
          remainingUsefulLife: Number(data.income.remainingUsefulLife) || 50,
          marketAdjustmentFactor: Number(data.income.marketAdjustmentFactor) || 1.0,
          operatingCosts: {
            administration: Number(data.income.operatingCosts?.administration) || 300,
            maintenancePerSqm: Number(data.income.operatingCosts?.maintenancePerSqm) || 10,
            vacancyRate: Number(data.income.operatingCosts?.vacancyRate) || 0.03,
          },
        };
      }

      // Add cost data if available
      if (data.cost && data.cost.grossFloorArea > 0 && data.cost.standardConstructionCost > 0) {
        payload.cost = {
          plotArea: Number(data.cost.plotArea) || 0,
          landValueRate: Number(data.cost.landValueRate) || 400,
          grossFloorArea: Number(data.cost.grossFloorArea),
          standardConstructionCost: Number(data.cost.standardConstructionCost),
          constructionIndexCurrent: Number(data.cost.constructionIndexCurrent) || 160,
          constructionIndexBase: Number(data.cost.constructionIndexBase) || 100,
          age: Number(data.cost.age) || 20,
          totalUsefulLife: Number(data.cost.totalUsefulLife) || 80,
          externalFacilitiesRate: Number(data.cost.externalFacilitiesRate) || 0.04,
          marketAdjustmentFactor: Number(data.cost.marketAdjustmentFactor) || 1.0,
        };
      }

      // Normalize weights
      const totalWeight = payload.weights.comparative + payload.weights.income + payload.weights.cost;
      if (totalWeight > 0) {
        payload.weights.comparative = payload.weights.comparative / totalWeight;
        payload.weights.income = payload.weights.income / totalWeight;
        payload.weights.cost = payload.weights.cost / totalWeight;
      }

      console.log("Sending payload to API:", payload);
      
      const marketRes = await marketValue(payload);
      console.log("API Response:", marketRes);
      
      setResult({ ...marketRes, inputData: data });
      setCurrentStep(STEPS.RESULT);
    } catch (err) {
      console.error("Valuation error:", err);
      setErrors({ 
        submit: err.message || "Bewertung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben."
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setData({ ...INITIAL_DATA });
    setCurrentStep(STEPS.OBJECT);
    setResult(null);
    setErrors({});
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.OBJECT:
        return (
          <StepOne 
            data={data} 
            setData={setData} 
            errors={errors}
          />
        );
      case STEPS.COMPARATIVE:
        return data.propertyType !== "Land" ? (
          <StepComparative 
            data={data} 
            setData={setData} 
            errors={errors}
          />
        ) : null;
      case STEPS.INCOME:
        return ["Condominium", "MultiFamilyBuilding"].includes(data.propertyType) ? (
          <StepIncome 
            data={data} 
            setData={setData} 
            errors={errors}
          />
        ) : null;
      case STEPS.COST:
        // Show Cost method for ALL property types except Land
        return data.propertyType !== "Land" ? (
          <StepCost 
            data={data} 
            setData={setData} 
            errors={errors}
          />
        ) : null;
      case STEPS.RESULT:
        return <Result result={result} onReset={resetForm} />;
      default:
        return <StepOne data={data} setData={setData} errors={errors} />;
    }
  };

  const getStepTitle = () => {
    const titles = {
      [STEPS.OBJECT]: "Objektinformationen",
      [STEPS.COMPARATIVE]: "Vergleichswertverfahren",
      [STEPS.INCOME]: "Ertragswertverfahren",
      [STEPS.COST]: "Sachwertverfahren",
      [STEPS.RESULT]: "Bewertungsergebnis",
    };
    return titles[currentStep] || "Bewertung";
  };

  if (currentStep === STEPS.RESULT) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {renderStep()}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-textDark">{getStepTitle()}</h2>
            <span className="text-sm text-textMuted">
              Schritt {applicableSteps.indexOf(currentStep) + 1} von {applicableSteps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Error display */}
        {errors.submit && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current step */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 animate-fadeIn">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === STEPS.OBJECT || loading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleNext}
            disabled={loading || !canProceedToNextStep(currentStep, data)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Berechne...
              </>
            ) : currentStep === applicableSteps[applicableSteps.length - 1] ? (
              "Bewertung berechnen"
            ) : (
              "Weiter"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}

function getApplicableSteps(propertyType) {
  const steps = [STEPS.OBJECT];
  
  if (propertyType !== "Land") {
    steps.push(STEPS.COMPARATIVE);
  }
  
  // Show Income method for Condominium and MultiFamilyBuilding
  if (["Condominium", "MultiFamilyBuilding"].includes(propertyType)) {
    steps.push(STEPS.INCOME);
  }
  
  // Show Cost method for ALL property types except Land
  if (propertyType !== "Land") {
    steps.push(STEPS.COST);
  }
  
  return steps;
}