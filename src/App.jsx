/* eslint-disable no-unused-vars */
import CalcDigit from './CalcDigit';
import CalcOperation from './CalcOperation';
import './styles.css'
import { useReducer } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ACTIONS = {
  ADD_DIGIT : 'select-digit',
  ADD_OPERATION : 'select-operation',
  CLEAR_ALL : 'clear-all',
  EVALUATE : 'evaluate',
  REMOVE_DIGIT : 'remove-digit'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currOpr : payload.digit,
          overwrite : false
        }
      }
      if(payload.digit === "0" && state.currOpr === "0") return state
      if(payload.digit === "." && state.currOpr.includes(".")) return state
      return {
        ...state,
        currOpr : `${state.currOpr || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR_ALL:
      return {}
    case ACTIONS.ADD_OPERATION:
      if(state.currOpr == null && state.prevOpr == null) {
        return state
      }
      if(state.currOpr == null){
        return{
          ...state,
          operation : payload.operation
        }
      }
      if(state.prevOpr == null) {
        return {
          ...state,
          operation : payload.operation,
          prevOpr : state.currOpr,
          currOpr : null
        }
      }
      return{
        prevOpr : evaluate(state),
        operation : payload.operation,
        currOpr : null
      }
    case ACTIONS.EVALUATE:
      if(state.currOpr == null || state.prevOpr == null || state.operation == null){
        return state
      }
      return{
        ...state,
        currOpr : evaluate(state),
        prevOpr : null,
        operation :null,
        overwrite : true
      }
    case ACTIONS.REMOVE_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          overwrite :false,
          currOpr : null
        }
      }
      if(state.currOpr == null) return state
      if(state.currOpr.length === 1){
        return{
          ...state,
          currOpr : null
        }
      }
      return{
        ...state,
        currOpr : state.currOpr.slice(0,-1)
      }
  }
}

function evaluate({prevOpr,currOpr,operation}) {
  let currValue = parseFloat(currOpr)
  let prevValue = parseFloat(prevOpr)
  let evaluation = ""
  if(isNaN(currValue) || isNaN(prevOpr)) return ""
  switch(operation){
    case '*':
      evaluation = prevValue * currValue
      break
    case '÷':
      evaluation = prevValue / currValue
      break
    case '+':
      evaluation = prevValue + currValue
      break
    case '-':
      evaluation = prevValue - currValue
      break
  }
  return evaluation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits : 0
})

function formatter(operand){
  if( operand == null ) return
  const [integer,decimal] = operand.split(".")
  if(decimal == null ) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}`
}
export default function App() {

  const [{currOpr, prevOpr, operation},dispatch] = useReducer(reducer,{})
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{formatter(prevOpr)} {operation}</div>
        <div className="current-operand">{formatter(currOpr)}</div>
      </div>
      <button className='span-two' onClick={ () => dispatch({type : ACTIONS.CLEAR_ALL})}>
        AC
      </button>
      <button onClick={() => dispatch({type : ACTIONS.REMOVE_DIGIT})}>
        DEL
      </button>
      <CalcOperation operation='÷' dispatch={dispatch}/>

      <CalcDigit digit='1' dispatch={dispatch} />
      <CalcDigit digit='2' dispatch={dispatch} />
      <CalcDigit digit='3' dispatch={dispatch} />
      <CalcOperation operation='*' dispatch={dispatch}/>
      <CalcDigit digit='4' dispatch={dispatch} />
      <CalcDigit digit='5' dispatch={dispatch} />
      <CalcDigit digit='6' dispatch={dispatch} />
      <CalcOperation operation='+' dispatch={dispatch}/>

      <CalcDigit digit='7' dispatch={dispatch} />
      <CalcDigit digit='8' dispatch={dispatch} />
      <CalcDigit digit='9' dispatch={dispatch} />
      <CalcOperation operation='-' dispatch={dispatch}/>

      <CalcDigit digit='.' dispatch={dispatch} />
      <CalcDigit digit='0' dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({type : ACTIONS.EVALUATE})}>
        =
      </button>
    </div>
  )
}
