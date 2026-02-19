import { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import StepOne from "../components/bewertung/StepOne";
import StepComparative from "../components/bewertung/StepComparative";
import StepIncome from "../components/bewertung/StepIncome";
import StepCost from "../components/bewertung/StepCost";
import Result from "../components/bewertung/Result";
import { calculateValuation as calculateValuationAPI } from "../api/valuation.api";
import { validateStep, canProceedToNextStep } from "../utils/stepValidation";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

/* ---------------- CONSTANTS ---------------- */
const STEPS = {
  OBJECT: 0,
  COMPARATIVE: 1,
  INCOME: 2,
  COST: 3,
  RESULT: 4,
};

const INITIAL_INCOME = {
  plotArea: 0,
  landValueRate: 0,
  livingArea: 0,
  rentPerSqm: 0,
  capitalizationRate: 0,
  remainingUsefulLife: 0,
  marketAdjustmentFactor: 1.0,
  operatingCosts: {
    administration: 0,
    maintenancePerSqm: 0,
    vacancyRate: 0,
  },
};

const INITIAL_COST = {
  plotArea: 0,
  landValueRate: 0,
  grossFloorArea: 0,
  standardConstructionCost: 0,
  constructionIndexCurrent: 0,
  constructionIndexBase: 100,
  age: 0,
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
  propertyType: "",
  comparative: {
    comparables: [{ ...INITIAL_COMPARABLE }],
  },
  income: { ...INITIAL_INCOME },
  cost: { ...INITIAL_COST },
  spf: 0,
};

/* ---------------- HELPERS ---------------- */
const getApplicableSteps = (propertyType) => {
  const steps = [STEPS.OBJECT];

  switch (propertyType) {
    case "Condominium":
      steps.push(STEPS.COMPARATIVE, STEPS.INCOME);
      break;
    case "SingleFamilyHome":
      steps.push(STEPS.COMPARATIVE, STEPS.COST);
      break;
    case "MultiFamilyBuilding":
      steps.push(STEPS.INCOME, STEPS.COST);
      break;
    case "Land":
      steps.push(STEPS.COMPARATIVE);
      break;
    default:
      break;
  }

  return steps;
};

/* ---------------- COMPONENT ---------------- */
export default function Bewertung() {
  const [data, setData] = useState({ ...INITIAL_DATA });
  const [currentStep, setCurrentStep] = useState(STEPS.OBJECT);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(0);

  const location = useLocation();
  const { user } = useAuth();

  // Load saved valuation if ID in URL
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("load");
    if (id && user) {
      const loadValuation = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE || "http://localhost:5000/api"}/valuations/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await res.json();
          if (data.success && data.valuation) {
            setData(data.valuation.data);
            toast.success("Bewertung geladen");
          } else {
            toast.error("Bewertung konnte nicht geladen werden");
          }
        } catch (error) {
          toast.error("Fehler beim Laden");
        }
      };
      loadValuation();
    }
  }, [location, user]);

  const applicableSteps = useMemo(
    () => getApplicableSteps(data.propertyType),
    [data.propertyType]
  );

  // If current step is no longer valid (and we're not on the result page), reset to first step
  useEffect(() => {
    if (!applicableSteps.includes(currentStep) && currentStep !== STEPS.RESULT) {
      setCurrentStep(applicableSteps[0]);
    }
  }, [applicableSteps, currentStep]);

  // Progress
  useEffect(() => {
    const stepIndex = applicableSteps.indexOf(currentStep);
    const percent =
      stepIndex >= 0
        ? Math.round(((stepIndex + 1) / applicableSteps.length) * 100)
        : 0;
    setProgress(percent);
  }, [currentStep, applicableSteps]);

  const validateCurrentStep = () => {
    const stepErrors = validateStep(currentStep, data);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    const currentIndex = applicableSteps.indexOf(currentStep);

    if (currentIndex === applicableSteps.length - 1) {
      submitValuation();
    } else {
      setCurrentStep(applicableSteps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = applicableSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(applicableSteps[currentIndex - 1]);
    }
  };

  const submitValuation = async () => {
    setLoading(true);
    setErrors({});
    setResult(null);

    try {
      const comparables =
        data.comparative?.comparables?.filter(
          (c) => Number(c.purchasePrice) > 0
        ) || [];

      const incomeData =
        data.income &&
        Number(data.income.livingArea) > 0 &&
        Number(data.income.rentPerSqm) > 0
          ? {
              ...data.income,
              capitalizationRate: Number(data.income.capitalizationRate) / 100,
            }
          : null;

      const costData =
        data.cost && Number(data.cost.grossFloorArea) > 0 ? data.cost : null;

      if (!comparables.length && !incomeData && !costData) {
        throw new Error(
          "Mindestens ein Bewertungsverfahren muss ausgefüllt sein."
        );
      }

      const payload = {
        comparables: comparables.length ? comparables : null,
        incomeData,
        costData,
      };

      const res = await calculateValuationAPI(payload);

      setResult({
        marketValue: res.marketValue,
        breakdown: res.breakdown,
        weights: res.weights,
        methods: res.methods,
        inputData: data,
      });

      setCurrentStep(STEPS.RESULT);
    } catch (err) {
      console.error("Valuation error:", err);
      setErrors({
        submit:
          err.message ||
          "Bewertung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.",
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
        return <StepOne data={data} setData={setData} errors={errors} />;

      case STEPS.COMPARATIVE:
        return data.propertyType === "Condominium" ||
          data.propertyType === "SingleFamilyHome" ||
          data.propertyType === "Land" ? (
          <StepComparative data={data} setData={setData} errors={errors} />
        ) : null;

      case STEPS.INCOME:
        return data.propertyType === "Condominium" ||
          data.propertyType === "MultiFamilyBuilding" ? (
          <StepIncome data={data} setData={setData} errors={errors} />
        ) : null;

      case STEPS.COST:
        return data.propertyType === "SingleFamilyHome" ||
          data.propertyType === "MultiFamilyBuilding" ? (
          <StepCost data={data} setData={setData} errors={errors} />
        ) : null;

      case STEPS.RESULT:
        return (
          <div className="w-full min-h-[320px]">
            <Result result={result} onReset={resetForm} />
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = {
    [STEPS.OBJECT]: "Objektinformationen",
    [STEPS.COMPARATIVE]: "Vergleichswertverfahren",
    [STEPS.INCOME]: "Ertragswertverfahren",
    [STEPS.COST]: "Sachwertverfahren",
    [STEPS.RESULT]: "Bewertungsergebnis",
  };

  if (currentStep === STEPS.RESULT) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">{renderStep()}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-bold">{stepTitles[currentStep]}</h2>
            <span className="text-sm text-textMuted">
              Schritt {applicableSteps.indexOf(currentStep) + 1} von{" "}
              {applicableSteps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {errors.submit && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded text-sm text-red-700">
            {errors.submit}
          </div>
        )}

        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === STEPS.OBJECT || loading}
            className="px-6 py-3 border rounded-lg disabled:opacity-50"
          >
            Zurück
          </button>

          <button
            onClick={handleNext}
            disabled={loading || !canProceedToNextStep(currentStep, data)}
            className="px-6 py-3 bg-primary text-white rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Berechne..."
              : currentStep === applicableSteps.at(-1)
              ? "Bewertung berechnen"
              : "Weiter"}
          </button>
        </div>
      </div>
    </Layout>
  );
}