import styles from "./LoadingBars.module.css";

function LoadingBars() {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Analyzing supplier risk...</p>
      <div className={styles.bars}>
        {["Geopolitical", "Environmental", "Labor", "Regulatory"].map(
          (label, i) => (
            <div key={label} className={styles.row}>
              <span className={styles.rowLabel}>
                {label.toUpperCase().slice(0, 3)}
              </span>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default LoadingBars;
