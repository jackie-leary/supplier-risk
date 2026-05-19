import styles from "./SupplierForm.module.css";

interface Props {
  onSubmit: (name: string, country: string, industry: string) => void;
  isLoading: boolean;
}

const fields = [
  { id: "name", label: "Supplier Name", placeholder: "Acme Corp" },
  { id: "country", label: "Country", placeholder: "Bangladesh" },
  { id: "industry", label: "Industry", placeholder: "Textiles" },
];

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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {fields.map(({ id, label, placeholder }) => (
          <div key={id} className={styles.field}>
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
            <input
              id={id}
              name={id}
              type="text"
              placeholder={placeholder}
              required
              className={styles.input}
            />
          </div>
        ))}
      </div>
      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? "Analyzing..." : "Run Assessment →"}
      </button>
    </form>
  );
}

export default SupplierForm;
