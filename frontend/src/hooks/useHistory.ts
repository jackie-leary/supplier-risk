import { useEffect, useState } from "react";

interface Assessment {
  _id: string;
  supplier: {
    name: string;
    country: string;
    industry: string;
  };
  riskProfile: {
    overallRisk: "Low" | "Medium" | "High";
    summary: string;
    redFlags: string[];
  };
  createdAt: string;
}

export function useHistory() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/history")
      .then((res) => res.json())
      .then((data) => setAssessments(data))
      .catch(() => setError("Failed to load history"))
      .finally(() => setIsLoading(false));
  }, []);

  return { assessments, isLoading, error };
}
