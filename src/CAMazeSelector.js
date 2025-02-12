
export default function CAMazeSelector(props) {
  return (
    <div style={{display:"flex"}}>
      <div 
        classID={"CAOption"}
        style={{
          width: 140,
          height: 20,
          backgroundColor: props.isCA ? "pink" : "white",
          border: "solid 1px black"
        }}
        onClick={() => {if(!props.isOn) props.setIsCA(true)}}
      >Cellular Automata</div>
      <div 
        classID={"MazeOption"}
        style={{
          width: 100,
          height: 20,
          backgroundColor: !props.isCA ? "pink" : "white",
          border: "solid 1px black"
        }}
        onClick={() => {if(!props.isOn) props.setIsCA(false);}}
      >Maze</div>
    </div>
  )
}