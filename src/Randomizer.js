import {CA} from './enums.js';
export default function Randomizer(props) {
  return <div style={{display: "flex"}}>
          <form>
            <label>
              random level (0 - 1): 
              <input type="text" value={props.randLevel} onChange={
                (event) => 
                  {let value = event.target.value;
                    if (!isNaN(value) && value >= 0 && value <= 1) props.setRandLevel(event.target.value);
              }}/>
            </label>
          </form>
          <button onClick={() => {
            var newArr = new Array(props.numRows).fill().map(
              () => new Array(props.numCols).fill().map(
                () => Math.random() < props.randLevel ? CA.ALIVE : CA.DEAD));
            props.setGrid(newArr);
          }}>randomize!</button>
      </div>
}