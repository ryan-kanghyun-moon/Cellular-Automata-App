const pxSize = 8;

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
                backgroundColor: (arr[i][k] && props.oneIsColor) || (!arr[i][k] && !props.oneIsColor) ? "green" : "white",
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