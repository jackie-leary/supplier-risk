import { useState, useEffect } from "react";

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

interface HistoryResponse {
  assessments: Assessment[];
  total: number;
  page: number;
  totalPages: number;
}

export function useHistory() {
  const [data, setData] = useState<HistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/history?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setError("Failed to load history"))
      .finally(() => setIsLoading(false));
  }, [page]);

  return {
    assessments: data?.assessments ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    page,
    setPage,
  };
}
