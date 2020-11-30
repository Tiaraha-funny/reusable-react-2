import React from 'react';
import ReactDOM from 'react-dom';
import UseRef from "./UseRef";

let callCount = -1
let states = []

//---------------------EXPLANATION OF USESTATE--------------------------------------------

function useState(initValue) {
  const id = ++callCount
  if (states[id]) return states[id]
  const setValue = (newValue) => {
    states[id][0] = newValue
    reRender()
  }
  let tuple = [initValue, setValue]
  states.push(tuple)
  return tuple
}
const CharacterCounterInput = ({ text, defaults }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const maxLength = 20
  console.log(states)
  return <div className={`counterInput ${message.length > maxLength ? "tooLong" : ""}`}>
    <div>
      {defaults.map((b) => {
        return <button key={b} onClick={() => {
          setMessage(b)
        }}>{b}</button>
      })}
    </div>
    <textarea
      placeholder={text}
      value={message}
      onChange={(event) => {
        setMessage(event.target.value)
        if (message.length > maxLength) {
          setError(true)
        } else {
          setError(false)
        }
      }}
    />
    <div>{message.length}/{maxLength}</div>
  </div>
}
const App = () => {
  let defaultMoods = ["Great", "Okay", "Bad", "TERRIBLE"]
  return (
    <section>
      <h2>Mood Tracker</h2>
      <CharacterCounterInput text={"How was your day?"} defaults={defaultMoods}/>
	  <UseRef/>
    </section>
  )
}
function reRender() {
  callCount = -1
  ReactDOM.render(<App />, document.getElementById('root'));
}
reRender()