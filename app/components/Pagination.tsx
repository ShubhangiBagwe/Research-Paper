"use client";

import React from "react";

interface PaginationProps {
  total: number;         
  perPage: number;        
  current: number;       
  onChange: (page: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({ total, perPage, current, onChange }) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null; // No pagination if only one page

  const handlePrev = () => {
    if (current > 1) onChange(current - 1);
  };

  const handleNext = () => {
    if (current < totalPages) onChange(current + 1);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "30px" }}>
      <button onClick={handlePrev} disabled={current === 1}>
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          style={{
            fontWeight: current === page ? "bold" : "normal",
            textDecoration: current === page ? "underline" : "none",
          }}
        >
          {page}
        </button>
      ))}

      <button onClick={handleNext} disabled={current === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
