import {CA, MAZE} from './enums';
const pxSize = 8;

function getColor(isCA, oneIsColor, cellValue) {
  if (isCA) {
    switch(cellValue) {
      case (CA.ALIVE) :
        return "green";
      case (CA.DEAD) :
        return "white";
      default :
        return "black";
    }
  } else {
      switch(cellValue) {
        case (MAZE.EMPTY_PATH) :
          return "white";
        case (MAZE.WALL) :
          return "black";
        case (MAZE.GOAL) :
          return "deeppink";
        case (MAZE.PATH_FOUND) :
          return "salmon";
        case (MAZE.PATH_TO_BE_SEARCHED) :
          return "lightseagreen";
        case (MAZE.SEARCHED) :
          return "paleturquoise";
        case (MAZE.START) :
          return "darkgreen";
        default :
          return "orange";
      }
  }
} 

function setValue(isCA, setGrid, isSelectingGoal, setIsSelectingGoal, isSelectingStart, setIsSelectingStart, cellValue) {
	if (isCA) {
                  var newArr = [...arr];
                  newArr[i][k] = arr[i][k] === CA.ALIVE ? CA.DEAD : CA.ALIVE;
                  props.setGrid(newArr);
	} else {
	if (isSelectingGoal) {
		var newArr = [...arr];
		
	}
		
	}
}

export default function Board(props) {
  const arr = props.grid;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.numCols}, ${pxSize + 2}px)`
      }}>
      {arr.map((row, i) => (
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              style={{
                width: pxSize,
                height: pxSize,
                backgroundColor: getColor(props.isCA, props.oneIsColor, arr[i][k]),
                border: "solid 1px black"
              }}
              onClick={() => {
                if (!props.isOn) {
                  var newArr = [...arr];
                  newArr[i][k] = arr[i][k] === CA.ALIVE ? CA.DEAD : CA.ALIVE;
                  props.setGrid(newArr);
                 
                }
              }}
            />
          ))
      ))}
    </div>
  );
}