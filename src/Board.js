import { CA, MAZE } from './enums';
const pxSize = 8;

function getColor(isCA, oneIsColor, cellValue) {
  if (isCA) {
    switch (cellValue) {
      case (CA.DEAD):
        return "white";
      default:
        return "green";
    }
  } else {
    switch (cellValue) {
      case (MAZE.EMPTY_PATH):
        return "white";
      case (MAZE.WALL):
        return "black";
      case (MAZE.GOAL):
        return "deeppink";
      case (MAZE.PATH_FOUND):
        return "salmon";
      case (MAZE.PATH_TO_BE_SEARCHED):
        return "lightseagreen";
      case (MAZE.SEARCHED):
        return "paleturquoise";
      case (MAZE.START):
        return "darkgreen";
      default:
        return "orange";
    }
  }
}

function setValue(i, k, arr, props) {
  var newArr = [...arr];
  if (props.isCA) {
    // var newArr = [...arr];
    newArr[i][k] = arr[i][k] === CA.DEAD ? CA.ALIVE : CA.DEAD;
    props.setGrid(newArr);
  } else {
    if (props.isSelectingGoal) {
      // var newArr = [...arr];
      newArr[i][k] = MAZE.GOAL;
      if (props.goal[0] !== -1) newArr[props.goal[0]][props.goal[1]] = MAZE.WALL;

      props.setGoal([i, k]);
      props.setIsSelectingGoal(false);
      props.setGrid(newArr);
    } else if (props.isSelectingStart) {
      // var newArr = [...arr];
      newArr[i][k] = MAZE.START;
      if (props.start[0] !== -1) newArr[props.start[0]][props.start[1]] = MAZE.WALL;

      props.setStart([i,k]);
      props.setIsSelectingStart(false);
      props.setGrid(newArr);
    } else {
      // var newArr = [...arr];
      if (arr[i][k] === MAZE.WALL) newArr[i][k] = MAZE.EMPTY_PATH;
      if (arr[i][k] === MAZE.EMPTY_PATH) newArr[i][k] = MAZE.WALL;

      props.setGrid(newArr);

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
              setValue(i, k, arr, props);
            }}
          />
        ))
      ))}
    </div>
  );
}