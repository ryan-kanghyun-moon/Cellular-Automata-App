const buttonSize = 20;

const rules = {
  'maze' : {
    surv : [0, 1, 1, 1, 1, 1, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  'mazectric' : {
    surv : [0, 1, 1, 1, 1, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },

  'game of life' : {
    surv : [0, 0, 1, 1, 0, 0, 0, 0, 0],
    live : [0, 0, 0, 1, 0, 0, 0, 0, 0],
  },
};

const ruleList = [
  'maze', 'mazectric', 'game of life', 'free',
];

function CAPanel(props) {
  return (
    <div>
      <form>
        <label>
          Select rule 
          <select value={props.currRule} onChange={(event) => {
            const val = event.target.value;
            props.setCurrRule(val);
            if (val !== 'free') {
            props.setLive(rules[val]['live']);
            props.setSurv(rules[val]['surv']);
          } else {
            props.setLive(new Array(9).fill(0));
            props.setSurv(new Array(9).fill(0));
          }}}>
            {ruleList.map((rule) => <option value={rule} key={`${rule}`}>{rule}</option>)}
          </select>
        </label>
      </form>
      <div> 
        <h3>A cell will come to life with</h3>
        <div style={{display: "flex"}}>
          {props.live.map((val, i) => 
            <div key={i} 
              className='botton'
              style={{
                height: buttonSize, 
                width: buttonSize, 
                backgroundColor: val ? "lightgreen" : "white",
                border: "solid 1px black"}}
                onClick={() => {
                if (props.currRule === 'free') {
                  var newLive = [...props.live];
                  newLive[i] = !props.live[i];
                  props.setLive(newLive);
                }
              }}>
            {i}
            </div>)}
        </div>
        <h3>living neighbors,</h3>
        <h3>and survive with</h3>
        <div style={{display: "flex"}}>
          {props.surv.map((val, i) => 
            <div key={i} 
              className='botton'
              style={{
                height: buttonSize, 
                width: buttonSize, 
                backgroundColor: val ? "skyblue" : "white",
                border: "solid 1px black"}}
              onClick={() => {
                if (props.currRule === 'free') {
                  var newSurv = [...props.surv];
                  newSurv[i] = !props.surv[i];
                  props.setSurv(newSurv);
                 }
                }}>
            {i}
            </div>)}
        </div>
        <h3>living neighbors,</h3>
        <h3>or be dead otherwise.</h3>
        
        <Spacer/>

        <button onClick={() => {props.setOneIsColor(!props.oneIsColor)}}>flip color scheme!</button>
      </div>
    </div>
  )
}

function Spacer() {
  return <div style={{width: 20, height: 20}}/>
}

export default CAPanel;