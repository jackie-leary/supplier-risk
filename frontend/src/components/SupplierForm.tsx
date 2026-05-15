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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Supplier Name</label>
        <input id="name" name="name" type="text" required />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" name="country" type="text" required />
      </div>
      <div>
        <label htmlFor="industry">Industry</label>
        <input id="industry" name="industry" type="text" required />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Assessing..." : "Assess Risk"}
      </button>
    </form>
  );
}

export default SupplierForm;
