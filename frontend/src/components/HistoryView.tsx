import { useHistory } from "../hooks/useHistory";

const riskConfig = {
  Low: { color: "var(--risk-low)", label: "LOW" },
  Medium: { color: "var(--risk-medium)", label: "MED" },
  High: { color: "var(--risk-high)", label: "HIGH" },
};

function HistoryView() {
  const { assessments, isLoading, error } = useHistory();

  if (isLoading)
    return (
      <p
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Loading history...
      </p>
    );

  if (error)
    return (
      <p
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: "12px",
          color: "var(--risk-high)",
        }}
      >
        {error}
      </p>
    );

  if (assessments.length === 0)
    return (
      <p
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        No assessments yet.
      </p>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      {assessments.map((a) => {
        const { color, label } = riskConfig[a.riskProfile.overallRisk];
        return (
          <div
            key={a._id}
            style={{
              background: "var(--surface)",
              padding: "16px",
              display: "grid",
              gridTemplateColumns: "60px 1fr 1fr auto",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color,
              }}
            >
              {label}
            </span>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>
              {a.supplier.name}
            </span>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              {a.supplier.country} · {a.supplier.industry}
            </span>
            <span
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "11px",
                color: "var(--text-muted)",
              }}
            >
              {new Date(a.createdAt).toLocaleDateString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default HistoryView;
