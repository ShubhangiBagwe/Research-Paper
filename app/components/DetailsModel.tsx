"use client";
import styles from "../styles/modal.module.scss";

export default function DetailsModal({ paper, onClose }:any) {
  const journal = paper.journal;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        <h2>{paper.papertitle}</h2>
        <p><strong>Author(s):</strong> {paper.coauthors}</p>
        <p><strong>Publisher:</strong> {paper.publisher?.publishername}</p>
        <p><strong>Journal:</strong> {journal?.title}</p>
        <p><strong>Impact Factor:</strong> {journal?.impactfactor}</p>
        <p><strong>Year:</strong> {new Date(paper.published_at).getFullYear()}</p>
        <p><strong>DOI/Link:</strong> <a href={paper.articlelink} target="_blank">{paper.articlelink}</a></p>
      </div>
    </div>
  );
}
