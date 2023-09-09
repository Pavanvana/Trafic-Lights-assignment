import { useMachine } from '@xstate/react';

import { timerMachine } from './machines/timerMachine';

import './App.css'; 

const App = () => {
  const [state, send] = useMachine(timerMachine)
  const redLightStatus = state.context.activeLight === "red" || state.context.activeLight === "redsmall"  ? "redActive" : "redInActive"
  const greenLightStatus = state.context.activeLight === "green" ? "greenActive" : "greenInActive"
  const yellowLightStatus = state.context.activeLight === "yellow" ? "yellowActive" : "yellowInActive"
  const blinkImg = state.context.timer > 0 && "blink-img"
  return(
    <div className='app-container'>
      <div className='card'>
        <div className='lights-container'>
          <div className={`light ${redLightStatus}`}></div>
          <div className={`light ${yellowLightStatus}`}></div>
          <div className={`light ${greenLightStatus}`}></div>
        </div>
        <div className='timer-container'>
          {state.context.timer <= 3 ? <p className={`hand-icon ${blinkImg}`}>✋</p> :
            <img src='https://em-content.zobj.net/source/microsoft-teams/337/man-walking_1f6b6-200d-2642-fe0f.png' alt='man-walking' className='man-wailkig-img'/>
          }
          <p className='timer-count'>{state.context.timer > 0 && state.context.timer}</p>
        </div>
      </div>
      <div className='buttons-container'>
        <button className='button' onClick={() => {
          send({
            type: 'prevState'
          })
        }}>⏪</button>
        {state.context.timerStatus !== 'pause' ? 
          <button className='button' onClick={() => {
            send({
              type: "PAUSE"
            })
          }}>⏸</button>
          :
          <button className='button' onClick={() => {
            send({
              type: "RESUME"
            })
          }}>
          ▶️</button>
        }
        <button className='button' onClick={() => {
          send({
            type: 'nextState'
          })
        }}>⏩</button>
      </div>
    </div>
  )
}

export default App;
