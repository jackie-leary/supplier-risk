import { useState } from "react";
import SupplierForm from "./components/SupplierForm";
import RiskProfile from "./components/RiskProfile";

interface RiskProfileData {
  overallRisk: "Low" | "Medium" | "High";
  categories: {
    geopolitical: string;
    environmental: string;
    labor: string;
    regulatory: string;
  };
  summary: string;
  redFlags: string[];
}

function App() {
  const [riskProfile, setRiskProfile] = useState<RiskProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    name: string,
    country: string,
    industry: string
  ) => {
    setIsLoading(true);
    setError(null);
    setRiskProfile(null);

    try {
      const response = await fetch("http://localhost:3000/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, industry }),
      });

      if (!response.ok) {
        throw new Error("Assessment failed");
      }

      const data = await response.json();
      setRiskProfile(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Supplier Risk Assessment</h1>
      <SupplierForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {riskProfile && <RiskProfile data={riskProfile} />}
    </div>
  );
}

export default App;
