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
const numRows = 50;
const numCols = 50;

function Spacer() {
  return <div style={{ width: 20, height: 20 }} />
}

function Game() {
  // universal
  var [isOn, setIsOn] = useState(false);
  var [grid, setGrid] = useState(() => Array(numRows).fill().map(() => new Array(numCols).fill(0)));
  const isOnRef = useRef(isOn);

  // CA
  var [surv, setSurv] = useState([0, 0, 1, 1, 0, 0, 0, 0, 0]);
  var [live, setLive] = useState([0, 0, 0, 1, 0, 0, 0, 0, 0]);
  var [currRule, setCurrRule] = useState('game of life');
  var [isCA, setIsCA] = useState(false);
  var [randLevel, setRandLevel] = useState(0.05);

  // MAZE
  var [isSelectingStart, setIsSelectingStart] = useState(false);
  var [isSelectingGoal, setIsSelectingGoal] = useState(false);
  var [currMazeRule, setCurrMazeRule] = useState(MAZE.DFS);
  var [start, setStart] = useState([-1, -1]);
  var [goal, setGoal] = useState([-1, -1]);
  var [foundGoal, setFoundGoal] = useState(false);
  var [cannotFindPath, setCannotFindPath] = useState(false);
	
  useEffect(() => {
	  if (!isOn) return;
    if (isCA) {
      var c = new ca.CA(grid, live, surv, setGrid, isOnRef);
      c.show();
    } else {
      // TODO
		if (goal[0] === -1 || start[0] === -1) {
			alert("set start and/or goal and try again");
		}
		var m = new Maze(currMazeRule, setGrid, start, goal, grid, isOnRef);
		var res = m.show();
		switch(res) {
			case (MAZE.PATH_FOUND) :
				alert("found path!");
				setIsOn(false);
				isOnRef.current(false);
				break;
			case (MAZE.WALL) :
				alert("could not find path ;(");
				setIsOn(false);
				isOnRef.current(false);
				break;
		}
		
    }
  }, [isOn]);

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

          <PlayPauseReset setIsOn={setIsOn} isOn={isOn} isOnRef={isOnRef} setGrid={setGrid} numRows={numRows} numCols={numCols} />

          <Spacer />

          <Randomizer setGrid={setGrid} randLevel={randLevel} setRandLevel={setRandLevel} numRows={numRows} numCols={numCols} />
        </div>
      </div>
    </div>
  )
}

export default Game;
