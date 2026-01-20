import { mockMarketValue } from "./mock.api";

const API_BASE = "http://localhost:5000/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `API Error: ${response.status}`);
  }
  return response.json();
};

export const healthCheck = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  } catch (error) {
    console.error("Backend connection failed, using mock:", error);
    return { status: "MOCK", message: "Using mock API - Backend not available" };
  }
};

export const marketValue = async (payload) => {
  try {
    console.log("Trying real API...");
    const res = await fetch(`${API_BASE}/valuation/market-value`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    const data = await handleResponse(res);
    
    // Check if backend returned null values
    if (data.marketValue === null || 
        (data.breakdown?.comparativeValue === null && 
         data.breakdown?.incomeValue === null && 
         data.breakdown?.costValue === null)) {
      console.log("Backend returned null values, using mock data");
      return await mockMarketValue(payload);
    }
    
    return data;
  } catch (error) {
    console.error("Real API failed, using mock:", error);
    return await mockMarketValue(payload);
  }
};

// Keep other functions as is
export const comparativeValue = async (comparables) => {
  try {
    const res = await fetch(`${API_BASE}/valuation/comparative`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comparables }),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Comparative API error:", error);
    throw new Error("Could not connect to valuation service. Please try again.");
  }
};

export const incomeValue = async (income) => {
  try {
    const res = await fetch(`${API_BASE}/valuation/income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(income),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Income API error:", error);
    throw new Error("Could not connect to valuation service. Please try again.");
  }
};

export const costValue = async (cost) => {
  try {
    const res = await fetch(`${API_BASE}/valuation/cost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cost),
    });
    return handleResponse(res);
  } catch (error) {
    console.error("Cost API error:", error);
    throw new Error("Could not connect to valuation service. Please try again.");
  }
};