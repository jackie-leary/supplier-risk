interface Categories {
  geopolitical: string;
  environmental: string;
  labor: string;
  regulatory: string;
}

interface RiskProfileData {
  overallRisk: "Low" | "Medium" | "High";
  categories: Categories;
  summary: string;
  redFlags: string[];
}

interface Props {
  data: RiskProfileData;
}

const riskConfig = {
  Low: { color: "var(--risk-low)", label: "LOW RISK" },
  Medium: { color: "var(--risk-medium)", label: "MEDIUM RISK" },
  High: { color: "var(--risk-high)", label: "HIGH RISK" },
};

const categoryIcons: Record<string, string> = {
  geopolitical: "GEOPOLITICAL",
  environmental: "ENVIRONMENTAL",
  labor: "LABOR",
  regulatory: "REGULATORY",
};

function RiskProfile({ data }: Props) {
  const { color, label } = riskConfig[data.overallRisk];

  return (
    <div style={{ marginTop: "48px", animation: "fadeIn 0.4s ease" }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Overall risk banner */}
      <div
        style={{
          border: `1px solid ${color}`,
          padding: "20px 24px",
          marginBottom: "32px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "13px",
            letterSpacing: "0.15em",
            color,
          }}
        >
          {label}
        </span>
        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginLeft: "auto",
          }}
        >
          {data.summary}
        </span>
      </div>

      {/* Categories */}
      <div style={{ marginBottom: "32px" }}>
        <p
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Risk Categories
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {Object.entries(data.categories).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                gap: "32px",
                background: "var(--surface)",
                padding: "16px",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "var(--accent)",
                  paddingTop: "2px",
                }}
              >
                {categoryIcons[key]}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "var(--text)",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Red flags */}
      {data.redFlags.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Red Flags
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {data.redFlags.map((flag, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  padding: "12px 16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    color: "var(--risk-high)",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    paddingTop: "2px",
                  }}
                >
                  !
                </span>
                <span style={{ fontSize: "13px", lineHeight: "1.6" }}>
                  {flag}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskProfile;
