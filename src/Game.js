import React, { useState, useRef, useEffect } from 'react';
import * as ca from "./CA.js";
import PlayPauseReset from "./PlayPauseReset.js";
import Randomizer from './Randomizer.js';
import Board from './Board.js';
import CAPanel from './CAPanel.js';
import CAMazeSelector from './CAMazeSelector.js';
import MazePanel from './MazePanel.js';
import {CA, MAZE} from './enums.js';
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
  var [isCA, setIsCA] = useState(false);
  var [isOn, setIsOn] = useState(false);
  var [randLevel, setRandLevel] = useState(0.05);
  var [isSelectingStart, setIsSelectingStart] = useState(false);
  var [isSelectingGoal, setIsSelectingGoal] = useState(false);
  var [currMazeRule, setCurrMazeRule] = useState(MAZE.DFS);
  
  const isOnRef = useRef(isOn);
  useEffect(() => {
      if (isCA) {
        var c = new ca.CA(grid, live, surv, setGrid, isOnRef);
        c.show();
      } else {
        // TODO
      }
  }, [isOn]);
  
  return (
    <div>
      <div style={{display:"flex"}}>
        <Board grid={grid} setGrid={setGrid} rule={currRule} isOn={isOn} numCols={numCols} numRows={numRows} isCA={isCA} isSelectingGoal={isSelectingGoal} setIsSelectingGoal={setIsSelectingGoal} isSelectingStart={isSelectingStart} setIsSelectingStart={setIsSelectingStart}/>
       
        <Spacer/>

        <div>
          <CAMazeSelector isCA={isCA} setIsCA={setIsCA} isOn={isOn}/>

          <Spacer/>
          
          <div>
            {isCA ?  
              <CAPanel currRule={currRule} setCurrRule={setCurrRule} surv={surv} setSurv={setSurv} live={live} setLive={setLive} />
              :
              <MazePanel currMazeRule={currMazeRule} setCurrMazeRule={setCurrMazeRule} isSelectingGoal={isSelectingGoal} setIsSelectingGoal={setIsSelectingGoal} isSelectingStart={isSelectingStart} setIsSelectingStart={setIsSelectingStart} isOn={isOn}/>}
          </div>

          <Spacer/>

          <PlayPauseReset setIsOn={setIsOn} isOn={isOn} isOnRef={isOnRef} setGrid={setGrid} numRows={numRows} numCols={numCols} />
			
      	  <Spacer/>
			
          <Randomizer setGrid={setGrid} randLevel={randLevel} setRandLevel={setRandLevel} numRows={numRows} numCols={numCols} />
        </div>
      </div>
    </div>
  ) 
}

export default Game;
