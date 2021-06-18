import React from 'react';
import ReactDOM from 'react-dom';
const numRows = 120;
const numCols = 120;
const pxSize = 8;

function App() {
  const arr = Array(numRows).fill(Array(numCols).fill(0));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, ${pxSize + 2}px)`
      }}>
      {arr.map((row, i) => (
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              style={{
                width: pxSize,
                height: pxSize,
                backgroundColor: "green",
                border: "solid 1px black"
              }}
            />
          ))
      ))}
    </div>
  );
}

export default App;
