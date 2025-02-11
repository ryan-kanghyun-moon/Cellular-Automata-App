export default function PlayPauseReset(props) {
  return <div>
          <button classID="playPauseButton" onClick={() => {
            props.setIsOn(!props.isOn);
            props.isOnRef.current = !props.isOn;
            }}>
            {!props.isOn ? "play" : "pause"}
          </button>
          
          {!props.isOn && <button classID="resetButton" onClick={() => {
            props.setGrid(() => Array(props.numRows).fill().map(() => new Array(props.numCols).fill(0)));
					   props.setGoal([-1,-1]);
					   props.setStart([-1,-1]);
            }}>
            {"reset"}
          </button>}
  </div>
}