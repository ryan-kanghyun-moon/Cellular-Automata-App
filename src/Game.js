import React, { useState, useRef, useEffect } from 'react';
import * as ca from "./CA.js";
import PlayPauseReset from "./PlayPauseReset.js";
import Randomizer from './Randomizer.js';
import Board from './Board.js';
import CAPanel from './CAPanel.js';
import CAMazeSelector from './CAMazeSelector.js';
import MazePanel from './MazePanel.js';
const numRows = 100;
const numCols = 100;

function Spacer() {
  return <div style={{width: 20, height: 20}}/>
}

function Game() {
  var [grid, setGrid] = useState(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
  var [surv, setSurv] = useState([0, 0, 1, 1, 0, 0, 0, 0, 0]);
  var [live, setLive] = useState([0, 0, 0, 1, 0, 0, 0, 0, 0]);
  var [currRule, setCurrRule] = useState('game of life');
  var [isCA, setIsCA] = useState(true);
  var [isOn, setIsOn] = useState(false);
  var [randLevel, setRandLevel] = useState(0.05);
  var [oneIsColor, setOneIsColor] = useState(true);
  
  const isOnRef = useRef(isOn);
  useEffect(() => {
      var c = new ca.CA(grid, live, surv, setGrid, isOnRef);
      c.show();
  }, [isOn]);
  
  return (
    <div>
      <div style={{display:"flex"}}>
        <Board grid={grid} setGrid={setGrid} rule={currRule} isOn={isOn} oneIsColor={oneIsColor} numCols={numCols} numRows={numRows} />
       
        <Spacer/>

        <div>
          <CAMazeSelector isCA={isCA} setIsCA={setIsCA}/>

          <Spacer/>
          
          <div>
            {isCA ?  
              <CAPanel currRule={currRule} setCurrRule={setCurrRule} surv={surv} setSurv={setSurv} live={live} setLive={setLive} oneIsColor={oneIsColor} setOneIsColor={setOneIsColor}/>
              :
              <MazePanel/>}
          </div>

          <Spacer/>

          <PlayPauseReset setIsOn={setIsOn} isOn={isOn} isOnRef={isOnRef} setGrid={setGrid} numRows={numRows} numCols={numCols} />
        </div>
      </div>

      <Spacer/>

      <Randomizer setGrid={setGrid} randLevel={randLevel} setRandLevel={setRandLevel} numRows={numRows} numCols={numCols} />

    </div>
  ) 
}

export default Game;
