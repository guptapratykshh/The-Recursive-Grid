# The Recursive Grid

A Next.js implementation of the "Recursive Grid" coding challenge.

## Live Demo

**[View Live Application](https://the-recursive-grid.vercel.app/)**

## Features

- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS Modules (no external libraries)
- **Language**: TypeScript
- **State Management**: React `useState` with a breadth-first update queue for ripple effects.

## The Logic

The grid consists of 9 boxes (3x3), all starting at 0.

### Interaction Rules
1.  **Click**: Increment a box by 1.
2.  **Ripple Rules**:
    -   If a box's new number is divisible by **3**, decrement the box to its **RIGHT** by 1. (Unless in the last column).
    -   If a box's new number is divisible by **5**, increment the box **BELOW** it by 2. (Unless in the bottom row).
    -   These rules trigger recursively for any updated box.

### Visual Rules
-   **Even Numbers**: Light Gray (`#e0e0e0`).
-   **Odd Numbers**: Navy Blue (`#1a237e`), White Text.
-   **Locked State**: If a box reaches **15**:
    -   Background turns Red (`#d32f2f`).
    -   Box cannot be clicked.
    -   Neighbors cannot change its value.

## Implementation Details

-   **State**: The grid is stored as a flat array of 9 numbers. `grid[index]`.
-   **Recursion Handling**: Instead of deep recursion which might cause stack overflow (though unlikely here) or React render loops, we use an iterative queue processing approach within the click handler:
    1.  Push initial click to queue.
    2.  Structure: `{ index, change }`.
    3.  While queue is not empty:
        -   Pop item.
        -   If target is locked, skip.
        -   Apply change.
        -   Check new value for Div-3 and Div-5 rules.
        -   Push resulting neighbor updates to queue.
    4.  Update React state once with the final grid.

## How to Run Locally

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.
