"use client";

import React from "react";
import { PaginationProps } from "../type/main";

const Pagination: React.FC<PaginationProps> = React.memo(({ total, perPage, current, onChange }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (current > 1) onChange(current - 1);
  };

  const handleNext = () => {
    if (current < totalPages) onChange(current + 1);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "30px" }}>
      <button onClick={handlePrev} disabled={current === 1}>Prev</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          style={{
            fontWeight: current === page ? "bold" : "normal",
            textDecoration: current === page ? "underline" : "none",
            backgroundColor: current === page ? "#1677ff" : "#f0f0f0",
            color: current === page ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNext} disabled={current === totalPages}>Next</button>
    </div>
  );
});

Pagination.displayName = "Pagination";
export default Pagination;
