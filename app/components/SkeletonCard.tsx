'use client';
import React from 'react';
import styles from '../styles/card.module.scss';
export default function SkeletonCard() {
  return (
    <div className={`${styles.card} ${styles.skeleton}`}>
      <div className={styles.media}></div>
      <div className={styles.content}>
        <div className={styles.line} style={{ width: '70%' }}></div>
        <div className={styles.line} style={{ width: '50%' }}></div>
      </div>
    </div>
  );
}