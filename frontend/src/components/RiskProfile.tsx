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

const riskColors = {
  Low: "#2e7d32",
  Medium: "#f57c00",
  High: "#c62828",
};

function RiskProfile({ data }: Props) {
  return (
    <div>
      <h2>Risk Assessment Result</h2>

      <div style={{ color: riskColors[data.overallRisk] }}>
        <strong>Overall Risk: {data.overallRisk}</strong>
      </div>

      <p>{data.summary}</p>

      <h3>Categories</h3>
      <ul>
        {Object.entries(data.categories).map(([key, value]) => (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value}
          </li>
        ))}
      </ul>

      {data.redFlags.length > 0 && (
        <>
          <h3>Red Flags</h3>
          <ul>
            {data.redFlags.map((flag, i) => (
              <li key={i}>{flag}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RiskProfile;
