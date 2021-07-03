import React, { useState } from 'react';
import ReactDOM from 'react-dom'
const numRows = 100;
const numCols = 100;
const pxSize = 8;
const buttonSize = 20;

const rules = {
  maze : {
    surv : [0, 1, 1, 1, 1, 1, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  mazectric : {
    surv : [0, 1, 1, 1, 1, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  'game of life' : {
    surv : [0, 0, 1, 1, 0, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },
};

const ruleList = [
  'maze', 'mazectric', 'game of life', 'free',
];

function CAMazeSelector(props) {
  return (
    <div style={{display:"flex"}}>
      <div 
        classID={"CAOption"}
        style={{
          width: 130,
          height: 20,
          backgroundColor: props.isCA ? "pink" : "white",
          border: "solid 1px black"
        }}
        onClick={() => props.setIsCA(!props.isCA)}
      >Cellular Automata</div>
      <div 
        classID={"MazeOption"}
        style={{
          width: 130,
          height: 20,
          backgroundColor: !props.isCA ? "pink" : "white",
          border: "solid 1px black"
        }}
        onClick={() => props.setIsCA(!props.isCA)}
      >Maze</div>
    </div>
  )
}

function CAPanel(props) {
  
  return (
    <div>
      <form>
        <label>
          Select rule 
          <select value={props.currRule} onChange={(event) => {
            const val = event.target.value;
            props.setCurrRule(val);
            if (val !== 'free') {
            props.setLive(rules[val]['live']);
            props.setSurv(rules[val]['surv']);
          } else {
            props.setLive(new Array(9).fill(0));
            props.setSurv(new Array(9).fill(0));
          }}}>
            {ruleList.map((rule) => <option value={rule} key={`${rule}`}>{rule}</option>)}
          </select>
        </label>
      </form>
      <div> 
        <h3>A cell will come to life with</h3>
        <div style={{display: "flex"}}>
          {props.live.map((val, i) => 
            <div key={i} 
              className='botton'
              style={{
                height: buttonSize, 
                width: buttonSize, 
                backgroundColor: val ? "lightgreen" : "white",
                border: "solid 1px black"}}
                onClick={() => {
                if (props.currRule === 'free') {
                  var newLive = [...props.live];
                  newLive[i] = !props.live[i];
                  props.setLive(newLive);
                }
              }}>
            {i}
            </div>)}
        </div>
        <h3>living neighbors,</h3>
        <h3>and survive with</h3>
        <div style={{display: "flex"}}>
          {props.surv.map((val, i) => 
            <div key={i} 
              className='botton'
              style={{
                height: buttonSize, 
                width: buttonSize, 
                backgroundColor: val ? "skyblue" : "white",
                border: "solid 1px black"}}
              onClick={() => {
                if (props.currRule === 'free') {
                  var newSurv = [...props.surv];
                  newSurv[i] = !props.surv[i];
                  props.setSurv(newSurv);
                 }
                }}>
            {i}
            </div>)}
        </div>
        <h3>living neighbors,</h3>
        <h3>or be dead otherwise.</h3>
        
      </div>
    </div>
  )
}

function MazePanel(props) {
  //TODO
  return (
    <div>
      Maze panel - coming very very soon!
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

function Spacer() {
  return <div style={{width: 20, height: 20}}/>
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
      <div style={{display:"flex"}}>
        <Board grid={grid} setGrid={setGrid} rule={currRule} isOn={isOn}/>
       
        <Spacer/>

        <div>
          <CAMazeSelector isCA={isCA} setIsCA={setIsCA}/>

          <Spacer/>
          
          <div>
            {isCA ?  
              <CAPanel currRule={currRule} setCurrRule={setCurrRule} surv={surv} setSurv={setSurv} live={live} setLive={setLive}/>
              :
              <MazePanel/>}
          </div>

          <Spacer/>

          <button classID="playPauseButton" onClick={() => {setIsOn(!isOn)}}>
            {!isOn ? "play" : "pause"}
          </button>
          
          <button classID="resetButton" onClick={() => {
            setGrid(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
            setIsOn(false);}}>
            {"reset"}
          </button>

        </div>
      </div>

      <Spacer/>

      <div style={{display: "flex"}}>
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
    </div>
  ) 
}

function App() {

 return (
   <Game />
 )
  
}

export default App;
