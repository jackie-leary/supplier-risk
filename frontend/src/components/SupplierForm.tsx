interface Props {
  onSubmit: (name: string, country: string, industry: string) => void;
  isLoading: boolean;
}

function SupplierForm({ onSubmit, isLoading }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const country = (form.elements.namedItem("country") as HTMLInputElement)
      .value;
    const industry = (form.elements.namedItem("industry") as HTMLInputElement)
      .value;
    onSubmit(name, country, industry);
  };

  const labelStyle = {
    display: "block",
    fontFamily: "IBM Plex Mono, monospace",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--text-muted)",
    marginBottom: "8px",
  };

  const inputStyle = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    padding: "12px 16px",
    fontSize: "14px",
    fontFamily: "IBM Plex Sans, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        {[
          { id: "name", label: "Supplier Name", placeholder: "Acme Corp" },
          { id: "country", label: "Country", placeholder: "Bangladesh" },
          { id: "industry", label: "Industry", placeholder: "Textiles" },
        ].map(({ id, label, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} style={labelStyle}>
              {label}
            </label>
            <input
              id={id}
              name={id}
              type="text"
              placeholder={placeholder}
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
        ))}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: isLoading ? "var(--surface-2)" : "var(--accent)",
            color: isLoading ? "var(--text-muted)" : "#0a0a0a",
            border: "none",
            padding: "14px 32px",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {isLoading ? "Analyzing..." : "Run Assessment →"}
        </button>
      </div>
    </form>
  );
}

export default SupplierForm;
