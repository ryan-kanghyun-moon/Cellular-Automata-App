import {MAZE} from './enums.js';


function Spacer() {
  return <div style={{width: 20, height: 20}}/>
}

const ruleList = [MAZE.DFS, MAZE.BFS];
function MazePanel(props) {
  //TODO
  return (
    <div>
 <form>
        <label>
          Select path finding rule 
          <select value={props.currMazeRule} onChange={(event) => {
            const val = event.target.value;
            props.setCurrMazeRule(val);
          }}>
            {ruleList.map((rule) => <option value={rule} key={`${rule}`}>{rule}</option>)}
          </select>
        </label>
      </form>
		<Spacer/>		  
      <div 
        classID={"SelectStart"}
        style={{
          // width: 140,
          height: 20,
          backgroundColor: props.isSelectingStart ? "darkgreen" : "white",
          border: "solid 1px black"
        }}
        onClick={() => props.setIsSelectingStart(!props.isSelectingStart)}
      >{props.isSelectingStart ? "pick!" : "click to pick your starting point"}</div>
		<Spacer/>		  
      <div 
        classID={"SelectGoal"}
        style={{
          // width: 140,
          height: 20,
          backgroundColor: props.isSelectingGoal ? "deeppink" : "white",
          border: "solid 1px black"
        }}
        onClick={() => props.setIsSelectingGoal(!props.isSelectingGoal)}
      >{props.isSelectingGoal ? "pick!" : "click to pick your goal"}</div>
    </div>
  )
}

export default MazePanel;