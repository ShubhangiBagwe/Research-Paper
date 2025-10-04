"use client";

import React, { useState } from "react";
import styles from "../styles/card.module.scss";
import { Button } from "antd";
import DetailsModal from "./DetailsModel";
import Image from "next/image";


interface Client {
  firstname?: string;
  lastname?: string;
}

interface Journal {
  title?: string;
  impactfactor?: number;
  journalimage?: { url?: string };
  publishingcompany?: string;
}
interface Paper {
  id: number;
  papertitle: string;
  client?: Client;
  coauthors?: string;
  journal?: Journal;
  articlelink?: string;
}
interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const [open, setOpen] = useState(false);
  const { papertitle, client, journal, articlelink } = paper;

  return (
    <>
      <div className={styles.paperCard}>
        {/* Left: Journal Image */}
        <div className="flex flex-col gap-5">
          <div className={styles.imageBox}>
            {journal?.journalimage?.url ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${journal.journalimage.url}`}
                alt={journal?.title || "Journal Image"}
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.placeholder}>No Image</div>
            )}
          </div>
          <div>
            {/* Impact Factor Badge */}
            {journal?.impactfactor ? (
              <div className={styles.impactBadge}>
                IF <strong>{journal.impactfactor}</strong>
              </div>
            ) : (
              <div className={styles.impactBadge}>
                IF 0
              </div>
            )}
          </div>
        </div>
        {/* Right: Details */}
        <div className={styles.details}>
          <h3>
            <span className={styles.label}>Paper Title:</span>{" "}
            {papertitle || "Untitled"}
          </h3>
          <hr />
          <p>
            <span className={styles.label}>Author:</span>{" "}
            {client
              ? `${client.firstname || ""} ${client.lastname || ""}`
              : paper.coauthors || "N/A"}
          </p>
          <p>
            <span className={styles.label}>Publisher:</span>{" "}
            {journal?.publishingcompany || "N/A"}
          </p>
          <p>
            <span className={styles.label}>Journal:</span> {journal?.title || "N/A"}
          </p>

          {/* Actions */}
          <div className={styles.actions}>
            {articlelink && (
              <Button
                type="link"
                href={articlelink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View PDF
              </Button>
            )}

            <Button type="primary"  size="small" onClick={() => setOpen(true)}>
              View Details
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <DetailsModal paper={paper} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default PaperCard;
