"use client";

import React, { useState, useEffect } from "react";
import { Input, Select, Space } from "antd";

const { Option } = Select;

interface SearchBarProps {
  onSearch: (query: string, field: "title" | "author" | "journal") => void;
  onSort: (sortBy: "title" | "year" | "impact", order: "asc" | "desc") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSort }) => {
  const [query, setQuery] = useState("");
  const [field, setField] = useState<"title" | "author" | "journal">("title");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() !== "") {
        onSearch(query, field);
      } else {
        onSearch("", field); // handle empty query
      }
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // cleanup previous timeout
    };
  }, [query, field, onSearch]);

  return (
    <Space style={{ marginBottom: 20 }}>
      <Select<"title" | "author" | "journal">
        value={field}
        onChange={(value) => setField(value)}
        style={{ width: 150 }}
      >
        <Option value="title">Title</Option>
        <Option value="author">Author</Option>
        <Option value="journal">Journal</Option>
      </Select>

      <Input.Search
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: 300 }}
        allowClear
      />

      <Select<string>
        defaultValue="Sort by"
        onChange={(v) => {
          const [sortBy, order] = (v as string).split("-") as [
            "title" | "year" | "impact",
            "asc" | "desc"
          ];
          onSort(sortBy, order);
        }}
        style={{ width: 180 }}
      >
        <Option value="title-asc">Title ↑</Option>
        <Option value="title-desc">Title ↓</Option>
        <Option value="year-asc">Year ↑</Option>
        <Option value="year-desc">Year ↓</Option>
        <Option value="impact-asc">Impact ↑</Option>
        <Option value="impact-desc">Impact ↓</Option>
      </Select>
    </Space>
  );
};

export default SearchBar;
