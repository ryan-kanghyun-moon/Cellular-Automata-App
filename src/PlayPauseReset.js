export default function PlayPauseReset(props) {
  return <div>
          <button classID="playPauseButton" onClick={() => {
            props.setIsOn(!props.isOn);
            props.isOnRef.current = !props.isOn;
            }}>
            {!props.isOn ? "play" : "pause"}
          </button>
          
          {!props.isOnRef.current&& <button classID="resetButton" onClick={() => {
            props.setGrid(() => Array(props.numRows).fill().map(() => new Array(props.numCols).fill(0)));
            }}>
            {"reset"}
          </button>}
  </div>
}