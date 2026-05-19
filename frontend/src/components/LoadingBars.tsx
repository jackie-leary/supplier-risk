function LoadingBars() {
  return (
    <div style={{ marginTop: "48px" }}>
      <p
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "16px",
        }}
      >
        Analyzing supplier risk...
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {["Geopolitical", "Environmental", "Labor", "Regulatory"].map(
          (label, i) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.05em",
                }}
              >
                {label.toUpperCase().slice(0, 3)}
              </span>
              <div
                style={{
                  background: "var(--surface)",
                  height: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "var(--accent)",
                    animation: `scan 1.4s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
      <style>{`
          @keyframes scan {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
    </div>
  );
}

export default LoadingBars;
