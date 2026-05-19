import styles from "./HistoryView.module.css";
import { useHistory } from "../hooks/useHistory";

const riskConfig = {
  Low: { color: "var(--risk-low)", label: "LOW" },
  Medium: { color: "var(--risk-medium)", label: "MED" },
  High: { color: "var(--risk-high)", label: "HIGH" },
};

function HistoryView() {
  const { assessments, isLoading, error, page, totalPages, setPage } =
    useHistory();

  if (isLoading) return <p className={styles.empty}>Loading history...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (assessments.length === 0 && page === 1)
    return <p className={styles.empty}>No assessments yet.</p>;

  return (
    <div>
      <div className={styles.container}>
        {assessments.map((a) => {
          const { color, label } = riskConfig[a.riskProfile.overallRisk];
          return (
            <div key={a._id} className={styles.row}>
              <span className={styles.risk} style={{ color }}>
                {label}
              </span>
              <span className={styles.name}>{a.supplier.name}</span>
              <span className={styles.meta}>
                {a.supplier.country} · {a.supplier.industry}
              </span>
              <span className={styles.date}>
                {new Date(a.createdAt).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Prev
          </button>
          <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default HistoryView;
