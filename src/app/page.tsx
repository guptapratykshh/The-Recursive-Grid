'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [grid, setGrid] = useState<number[]>(Array(9).fill(0));

  const isLocked = (val: number) => val >= 15;

  const handleBoxClick = (index: number) => {
    if (isLocked(grid[index])) return;

    const queue = [{ index, change: 1 }];
    const newGrid = [...grid];

    while (queue.length > 0) {
      const { index: currentIndex, change } = queue.shift()!;

      if (isLocked(newGrid[currentIndex])) continue;

      newGrid[currentIndex] += change;
      const newValue = newGrid[currentIndex];
      
      if (newValue % 3 === 0 && newValue !== 0) {
        if (currentIndex % 3 !== 2) {
          queue.push({ index: currentIndex + 1, change: -1 });
        }
      }

      if (newValue % 5 === 0 && newValue !== 0) {
         if (currentIndex < 6) {
           queue.push({ index: currentIndex + 3, change: 2 });
         }
      }
    }

    setGrid(newGrid);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recursive Grid</h1>
      <div className={styles.grid}>
        {grid.map((value, index) => {
          const locked = isLocked(value);
          const isEven = value % 2 === 0;
          
          let className = `${styles.box} `;
          if (locked) {
            className += styles.locked;
          } else if (isEven) {
            className += styles.even;
          } else {
            className += styles.odd;
          }

          return (
            <div
              key={index}
              className={className}
              onClick={() => handleBoxClick(index)}
            >
              {value}
            </div>
          );
        })}
      </div>
      <p className={styles.description}>
        Click a box to increment. Valid moves trigger recursive ripples based on divisibility by 3 (Right) and 5 (Down). reaching 15 locks the cell.
      </p>
    </div>
  );
}
