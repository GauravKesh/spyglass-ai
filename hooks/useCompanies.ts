"use client";

import { useEffect, useState } from "react";

export function useCompanies() {
  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.companies);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    companies,
    loading,
  };
}