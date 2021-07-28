import axios from 'axios'
import React, { useState } from 'react'
import { capitalize } from '../../helper'
import './style.css'

const ChangeStockModal = ({own, qtyData}) => {
  const [qty, setQty] = useState(qtyData)
  const [err, setErr] = useState(false)
  const [isQtySame, setQtySame] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  const reduceQty = () => {
    setQtySame(false)
    setSubmitted(false)
    if (qty > 0) {
      setQty(qty-1)
      setErr(false)
    }
    else {
      setErr(true)
    }
  }

  const addQty = () => {
    setQty(qty+1)
    setErr(false)
    setQtySame(false)
    setSubmitted(false)
  }

  const changeStock = () => {
    let response = ""
    const data = {
      name: own.name,
      taste: own.taste,
      qty: qty
    }
    if (qtyData === qty) {
      setQtySame(true)
    }
    else {
      if (qtyData > qty) {
        response = axios({
          method: 'post',
          url: 'http://localhost:5000/own/add',
          data: data
        })
      }
      else {
        response = axios({
          method: 'post',
          url: 'http://localhost:5000/own/substract',
          data: data
        })
      }

      if (response) {
        setSubmitted(true)
      }
    }
  }

  return (
    <div className='change-stock-modal-content'>
      <h1>Dorayaki:   {capitalize(own.taste)}</h1>
      <div className='change-stock'>
        <h1>Stock: </h1>
        <button onClick={() => reduceQty()}>-</button>
        <h1>{qty}</h1>
        <button onClick={() => addQty()}>+</button>
        {err && 
          <p>
            Dorayaki quantity shouldn't be negative, right?
          </p>
        }
      </div>
      <p
        style={isQtySame ? {color: "black"} : {color: "white"}}
      >
        Did you just change something?
      </p>
      <p
        style={isSubmitted ? {color: "black"} : {color: "white"}}
      >
        Successfully submitted!
      </p>
      <button
        className='change-stock-modal-button'
        onClick={() => changeStock()}
      >
        Change Stock
      </button>
    </div>
  )
}

export default ChangeStockModal