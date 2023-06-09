/* eslint-disable no-unused-vars */
import React from 'react'
import { ACTIONS } from './App';

export default function CalcDigit({dispatch,digit}) {
    return (
        <button onClick={() => dispatch({type:ACTIONS.ADD_DIGIT, payload : {digit}})}>{digit}</button>
    )
}
