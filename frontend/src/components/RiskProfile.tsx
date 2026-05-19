import styles from "./RiskProfile.module.css";

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

const categoryKeys: Record<string, string> = {
  geopolitical: "GEO",
  environmental: "ENV",
  labor: "LAB",
  regulatory: "REG",
};

function RiskProfile({ data }: Props) {
  const { color, label } = riskConfig[data.overallRisk];

  return (
    <div className={styles.container}>
      <div className={styles.banner} style={{ borderColor: color }}>
        <div className={styles.dot} style={{ background: color }} />
        <span className={styles.riskLabel} style={{ color }}>
          {label}
        </span>
        <span className={styles.summary}>{data.summary}</span>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Risk Categories</p>
        <div className={styles.rows}>
          {Object.entries(data.categories).map(([key, value]) => (
            <div key={key} className={styles.row}>
              <span className={styles.categoryKey}>{categoryKeys[key]}</span>
              <span className={styles.categoryValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {data.redFlags.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Red Flags</p>
          <div className={styles.rows}>
            {data.redFlags.map((flag, i) => (
              <div key={i} className={styles.flagRow}>
                <span className={styles.flagIcon}>!</span>
                <span className={styles.flagText}>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskProfile;
