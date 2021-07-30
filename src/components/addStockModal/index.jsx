import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { capitalize } from '../../helper'
import { BACKEND_URL } from '../../const'
import './style.css'

const AddStockModal = ({storeName, ownsData, total}) => {
  const [qty, setQty] = useState(0)
  const [taste, setTaste] = useState("")
  const [err, setErr] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  const [dorayakis, setDorayakis] = useState([])
  const [owns, setOwns] = useState(ownsData)
  const [isZero, setZero] = useState(false)

  useEffect(() => {
    async function fetchStoreName() {
      await axios.get(`${BACKEND_URL}/own/${storeName}`)
      .then(function (res) {
        setOwns(res.data)
      })
    }

    async function fetchDorayakis() {
      await axios.get(`${BACKEND_URL}/dorayaki`)
      .then(function (res) {
        if (owns.length !== 0) {
          let dorayakis = []
          for (let data of res.data) {
            if (owns.some(own => own.taste === data.taste)) {
              // do nothing
            }
            else {
              dorayakis.push(data)
            }
          }
          setTaste(dorayakis[0].taste)
          setDorayakis(dorayakis)
        }
        else {
          setTaste(res.data[0].taste)
          setDorayakis(res.data)
        }
      })

    }

    fetchStoreName()
    if (owns.length !== total) {
      fetchDorayakis()
    }
  }, [isSubmitted, storeName, owns, total])

  const handleChange = (e) => {
    setTaste(e.target.value)
    setErr(false)
    setQty(0)
  }

  const reduceQty = () => {
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
    setSubmitted(false)
  }

  const addStock = async () => {
    if (qty > 0) {
      const response = await axios({
        method: 'post',
        url: `${BACKEND_URL}/own/add`,
        data: {
          name: storeName,
          taste: taste,
          qty: qty
        }
      })
  
      console.log(response)
  
      if (response) {
        setSubmitted(true)
      }
    }
    else {
      setZero(true)
    }
  }

  return (
    <>
      {owns.length === total ? <h1 style={{marginLeft:'2rem'}}>Congrats for collecting all dorayakis!</h1> :
        <div className='add-stock-modal-content'>
          <h1 className='title'>Store: {capitalize(storeName)}</h1>  
          <div className='black-line'>-</div>
          <div className='add-stock-dorayaki'>
            <h1 className='title'>Dorayaki: </h1>
            <select onChange={handleChange}>
              {dorayakis.map((dorayaki, index) => 
                <option
                  key={index}
                  value={dorayaki.taste}
                >
                  {capitalize(dorayaki.taste)}
                </option>
              )}
            </select>
          </div>
          <div className='add-stock-qty'>
            <h1 className='title'>Quantity: </h1>
            <button onClick={reduceQty}>-</button>
            <h1 className='qty-number'>{qty}</h1>
            <button onClick={addQty}>+</button>
            {err &&
              <p>Are you trying to get negative amount of dorayakis?</p>
            }
          </div>
          <p style={isZero ? {color: "black"} : {color: "white"}}>
            Did you just try to add nothing?
          </p>
          <p style={isSubmitted ? {color: "black"} : {color: "white"}}>
            Successfully added! 
          </p>
          <button
            className='add-stock-modal-button'
            onClick={addStock}
          >
            Add Stock
          </button>
        </div>
      }
    </>
  )
}

export default AddStockModal