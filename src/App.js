import React, { useState } from 'react';
import ReactDOM from 'react-dom'
const numRows = 120;
const numCols = 120;
const pxSize = 8;

const rules = {
  maze : {
    surv : [0, 1, 1, 1, 1, 1, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  mazectric : {
    surv : [0, 1, 1, 1, 1, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  life : {
    surv : [0, 0, 1, 1, 0, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },
}

function CAMazeSelector(props) {
  // TODO
  return (
    <div>selector</div>
  )
}

function CAMazePanel(props) {
  // TODO
  return (
    <div>panel</div>
  )
}

function Board(props) {
  const arr = props.grid;
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
                backgroundColor: arr[i][k] ? "green" : "white",
                border: "solid 1px black"
              }}
              onClick={() => {
                if (!props.isOn) {
                  var newArr = [...arr];
                  newArr[i][k] = !arr[i][k];
                  props.setGrid(newArr);
                 
                }
              }}
            />
          ))
      ))}
    </div>
  );
}

function Game() {
  var [grid, setGrid] = useState(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
  var [rule, setRule] = useState('maze');
  var [isCA, setIsCA] = useState(true);
  var [isOn, setIsOn] = useState(false);

  return (
    <div>
      <CAMazeSelector isCA={isCA} setIsCA={setIsCA}/>
      <Board grid={grid} setGrid={setGrid} rule={rule} isOn={isOn}/>
      <CAMazePanel rule={rule} setRule={setRule}/>
      
      <button classID="playPauseButton" onClick={() => {setIsOn(!isOn)}}>
        {!isOn ? "play" : "pause"}
      </button>
      
      <button classID="resetButton" onClick={() => {
        setGrid(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
        setIsOn(false);}}>
        {"reset"}
      </button>
    </div>
  )
}

function App() {

 return (
   <Game />
 )
  
}

export default App;
