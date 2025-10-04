"use client";

import React, { useEffect, useState, useMemo } from "react";
import styles from "./styles/home.module.scss";
import Modal from "antd/es/modal/Modal";
import SearchBar from "./components/SearchBar";
import PaperCard from "./components/PaperCard";
import Pagination from "./components/Pagination";
import SkeletonCard from "./components/SkeletonCard";
import { Empty } from "antd";

interface Paper {
  id: number;
  papertitle: string;
  client?: {
    firstname?: string;
    lastname?: string;
  };
  coauthors?: string;
  publisher?: {
    publishername?: string;
  };
  journal?: {
    title?: string;
    impactfactor?: number;
  };
  articlelink?: string;
  published_at?: string;
}

export default function HomePage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [filtered, setFiltered] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/acceptedpapers`);
        const data: Paper[] = await res.json();
        setPapers(data);
        setFiltered(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string, field: string) => {
    const q = query.toLowerCase();
    const results = papers.filter((p) => {
      if (field === "title") return p.papertitle?.toLowerCase().includes(q);
      if (field === "author")
        return (
          p.client?.firstname?.toLowerCase().includes(q) ||
          p.client?.lastname?.toLowerCase().includes(q) ||
          p.coauthors?.toLowerCase().includes(q)
        );
      if (field === "journal") return p.journal?.title?.toLowerCase().includes(q);
      return true;
    });
    setFiltered(results);
    setCurrentPage(1);
  };

  const handleSort = (sortBy: string, order: "asc" | "desc") => {
    const sorted = [...filtered].sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      switch (sortBy) {
        case "title":
          aVal = a.papertitle || "";
          bVal = b.papertitle || "";
          break;
        case "year":
          aVal = new Date(a.published_at || "").getFullYear();
          bVal = new Date(b.published_at || "").getFullYear();
          break;
        case "impact":
          aVal = a.journal?.impactfactor || 0;
          bVal = b.journal?.impactfactor || 0;
          break;
      }

      if (order === "asc") return aVal > bVal ? 1 : -1;
      else return aVal < bVal ? 1 : -1;
    });
    setFiltered(sorted);
  };

  // Pagination slice
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  if (loading) {
  // Show multiple skeleton cards in grid layout
  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <div className={styles.grid}>
        {Array.from({ length: perPage }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} onSort={handleSort} />

      {paginated.length === 0 ? (
        <Empty description="No results found" />
      ) : (
        <div className={styles.grid}>
          {paginated.map((paper) => (
            <PaperCard key={paper.id} paper={paper}/>
          ))}
        </div>
      )}

      <Pagination total={filtered.length} perPage={perPage} current={currentPage} onChange={setCurrentPage} />

      {selectedPaper && (
        <Modal open={!!selectedPaper} onCancel={() => setSelectedPaper(null)} footer={null}>
          <PaperCard paper={selectedPaper} />
        </Modal>
      )}
    </div>
  );
}
