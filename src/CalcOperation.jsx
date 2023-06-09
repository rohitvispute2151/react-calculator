// eslint-disable-next-line no-unused-vars
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { ACTIONS } from './App';

export default function CalcOperation({dispatch,operation}) {
    return (
        <button onClick={() => dispatch({type:ACTIONS.ADD_OPERATION, payload : {operation}})}>{operation}</button>
    )
}
