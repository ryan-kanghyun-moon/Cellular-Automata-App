import React, { useState, useRef, useEffect } from 'react';
import * as ca from "./CA.js";
import Maze from "./Maze.js";
import PlayPauseReset from "./PlayPauseReset.js";
import Randomizer from './Randomizer.js';
import Board from './Board.js';
import CAPanel from './CAPanel.js';
import CAMazeSelector from './CAMazeSelector.js';
import MazePanel from './MazePanel.js';
import { CA, MAZE } from './enums.js';
const numRows = 70;
const numCols = 70;

function Spacer() {
  return <div style={{ width: 20, height: 20 }} />
}

function Game() {
  // universal
  var [isOn, setIsOn] = useState(false);
  var [grid, setGrid] = useState(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
  const isOnRef = useRef(isOn);
  var [isCA, setIsCA] = useState(true);
  var [randLevel, setRandLevel] = useState(0.05);

  // CA
  var [surv, setSurv] = useState([0, 0, 1, 1, 0, 0, 0, 0, 0]);
  var [live, setLive] = useState([0, 0, 0, 1, 0, 0, 0, 0, 0]);
  var [currRule, setCurrRule] = useState('game of life');

  // MAZE
  var [isSelectingStart, setIsSelectingStart] = useState(false);
  var [isSelectingGoal, setIsSelectingGoal] = useState(false);
  var [currMazeRule, setCurrMazeRule] = useState(MAZE.DFS);
  var [start, setStart] = useState([-1, -1]);
  var [goal, setGoal] = useState([-1, -1]);
	
  useEffect(() => {
	  if (!isOn) return;
    if (isCA) {
      var c = new ca.CA(grid, live, surv, setGrid, isOnRef);
      c.show();
    } else {
		if (goal[0] === -1 || start[0] === -1) {
			alert("set start and/or goal and try again");
			setIsOn(false);
			isOnRef.current = false;
			return;
		}
		var m = new Maze(currMazeRule, setGrid, start, goal, grid, isOnRef, setIsOn);
		m.show();
    }
  }, [isOn]);
	
  useEffect(() => {
	  if (isCA && !isOn && (start[0] !== -1 || goal[0] !== -1) ) {
				var g = grid.map((a) => a.slice());
		 if (start[0] !== -1) {
			 	g[start[0]][start[1]] = CA.ALIVE;
			 	setStart([-1,-1]);
		 } 
		  if (goal[0] !== -1) {
			 	g[goal[0]][goal[1]] = CA.ALIVE;
			 	setGoal([-1,-1]);
		  }
		  setGrid(g);
	  }
  }, [isCA]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Board grid={grid} setGrid={setGrid} rule={currRule} isOn={isOn} numCols={numCols} numRows={numRows} isCA={isCA} isSelectingGoal={isSelectingGoal} setIsSelectingGoal={setIsSelectingGoal} isSelectingStart={isSelectingStart} setIsSelectingStart={setIsSelectingStart} start={start} setStart={setStart} goal={goal} setGoal={setGoal}/>

        <Spacer />

        <div>
          <CAMazeSelector isCA={isCA} setIsCA={setIsCA} isOn={isOn} />

          <Spacer />

          <div>
            {isCA ?
              <CAPanel currRule={currRule} setCurrRule={setCurrRule} surv={surv} setSurv={setSurv} live={live} setLive={setLive} />
              :
              <MazePanel currMazeRule={currMazeRule} setCurrMazeRule={setCurrMazeRule} isSelectingGoal={isSelectingGoal} setIsSelectingGoal={setIsSelectingGoal} isSelectingStart={isSelectingStart} setIsSelectingStart={setIsSelectingStart} isOn={isOn} />}
          </div>

          <Spacer />

          <PlayPauseReset setIsOn={setIsOn} isOn={isOn} isOnRef={isOnRef} setGrid={setGrid} numRows={numRows} numCols={numCols} setStart={setStart} setGoal={setGoal} isCA={isCA} />

          <Spacer />

          <Randomizer setGrid={setGrid} randLevel={randLevel} setRandLevel={setRandLevel} numRows={numRows} numCols={numCols} />
        </div>
      </div>
    </div>
  )
}

export default Game;
