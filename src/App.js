import React, { useState } from 'react';
import ReactDOM from 'react-dom'
const numRows = 110;
const numCols = 110;
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

function CAPanel(props) {
  // TODO
  return (
    <div>CA panel</div>
  )
}

function MazePanel(props) {
  //TODO
  return (
    <div>
      Maze panel
    </div>
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
  var [surv, setSurv] = useState(rules.maze.surv);
  var [live, setLive] = useState(rules.maze.live);
  var [currRule, setCurrRule] = useState('maze');
  var [isCA, setIsCA] = useState(true);
  var [isOn, setIsOn] = useState(false);
  var [randLevel, setRandLevel] = useState(0.05);
  
  
  
  return (
    <div>
      <CAMazeSelector isCA={isCA} setIsCA={setIsCA}/>
      <Board grid={grid} setGrid={setGrid} rule={currRule} isOn={isOn}/>
      
      <div>
        {isCA ?  
          <CAPanel rule={currRule} setRule={setCurrRule} surv={surv} live={live}/>
          :
          <MazePanel/>}
      </div>
      
      <button classID="playPauseButton" onClick={() => {setIsOn(!isOn)}}>
        {!isOn ? "play" : "pause"}
      </button>
      
      <button classID="resetButton" onClick={() => {
        setGrid(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
        setIsOn(false);}}>
        {"reset"}
      </button>

      <form>
        <label>
          random level (0 - 1):
          <input type="text" value={randLevel} onChange={
            (event) => 
              {let value = event.target.value;
                Number(value) == value && value >= 0 && value <= 1 ? 
                setRandLevel(event.target.value) : setRandLevel(randLevel)}
          }/>
        </label>
      </form>
      <button onClick={() => {
        var newArr = new Array(numRows).fill().map(
          () => new Array(numCols).fill().map(
            () => Math.random() < randLevel ? 1 : 0));
        setGrid(newArr);
      }}>randomize!</button>

    </div>
  ) 
}

function App() {

 return (
   <Game />
 )
  
}

export default App;
