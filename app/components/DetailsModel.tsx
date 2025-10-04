"use client";

import styles from "../styles/modal.module.scss";
import { DetailsModalProps } from "../type/main";


export default function DetailsModal({ paper, onClose }: DetailsModalProps) {
  const journal = paper.journal;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        <h2>{paper.papertitle}</h2>
        <p>
          <strong>Author(s):</strong>{" "}
          {paper.client
            ? `${paper.client.firstname || ""} ${paper.client.lastname || ""}`
            : paper.coauthors || "N/A"}
        </p>
        <p>
          <strong>Publisher:</strong> {paper.publisher?.publishername || "N/A"}
        </p>
        <p>
          <strong>Journal:</strong> {journal?.title || "N/A"}
        </p>
        <p>
          <strong>Impact Factor:</strong> {journal?.impactfactor ?? "N/A"}
        </p>
        <p>
          <strong>Year:</strong>{" "}
          {paper.published_at
            ? new Date(paper.published_at).getFullYear()
            : "N/A"}
        </p>
        <p>
          <strong>DOI/Link:</strong>{" "}
          {paper.articlelink ? (
            <a href={paper.articlelink} target="_blank" rel="noopener noreferrer">
              {paper.articlelink}
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </div>
    </div>
  );
}
