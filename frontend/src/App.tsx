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

      if (!response.ok) throw new Error("Assessment failed");

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
      <header
        style={{
          marginBottom: "48px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Supply Chain Intelligence
        </p>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Supplier Risk Assessment
        </h1>
      </header>

      <SupplierForm onSubmit={handleSubmit} isLoading={isLoading} />

      {error && (
        <p
          style={{
            color: "var(--risk-high)",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "13px",
            marginTop: "24px",
          }}
        >
          {error}
        </p>
      )}

      {riskProfile && <RiskProfile data={riskProfile} />}
    </div>
  );
}

export default App;
