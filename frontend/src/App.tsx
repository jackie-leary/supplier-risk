import { useState } from "react";
import SupplierForm from "./components/SupplierForm";
import RiskProfile from "./components/RiskProfile";
import HistoryView from "./components/HistoryView";
import LoadingBars from "./components/LoadingBars";

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
  const [tab, setTab] = useState<"assess" | "history">("assess");

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

  const tabStyle = (active: boolean) => ({
    fontFamily: "IBM Plex Mono, monospace",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: active ? "var(--accent)" : "var(--text-muted)",
    background: "none",
    border: "none",
    borderBottom: active ? "1px solid var(--accent)" : "1px solid transparent",
    padding: "8px 0",
    cursor: "pointer",
    marginRight: "24px",
  });

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

      <nav style={{ marginBottom: "32px" }}>
        <button
          style={tabStyle(tab === "assess")}
          onClick={() => setTab("assess")}
        >
          New Assessment
        </button>
        <button
          style={tabStyle(tab === "history")}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </nav>

      {tab === "assess" && (
        <>
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
          {isLoading && <LoadingBars />}
          {riskProfile && <RiskProfile data={riskProfile} />}
        </>
      )}

      {tab === "history" && <HistoryView />}
    </div>
  );
}

export default App;
