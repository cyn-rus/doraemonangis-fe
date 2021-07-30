import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { capitalize } from '../../helper'
import { BACKEND_URL } from '../../const'
import './style.css'

const MoveStockModal = ({own, qtyData}) => {
  const [initQty, setInitQty] = useState(qtyData)
  const [fromQty, setFromQty] = useState(qtyData)
  const [toQty, setToQty] = useState(0)
  const [toStore, setToStore] = useState("")
  const [toErr, setToErr] = useState(false)
  const [fromErr, setFromErr] = useState(false)
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [isQtySame, setQtySame] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    async function fetchQty() {
      await axios.get(`${BACKEND_URL}/own/get-qty/${own.name}/${own.taste}`)
      .then(function (res) {
        setInitQty(res.data)
      })
    }
    fetchQty()
  }, [isSubmitted, own])

  const fetchStore = () => {
    axios.get(`${BACKEND_URL}/store`)
    .then(function (res) {
      const data = res.data.filter(function(obj) {
        return obj.name !== own.name
      })
      setToStore(data[0].name)
      setStores(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (toStore) {
      axios.get(`${BACKEND_URL}/own/get-qty/${toStore}/${own.taste}`)
        .then(function (res) {
          setToQty(res.data)
        })
    }
  }, [toStore, own])

  const addToQty = () => {
    setSubmitted(false)
    if (fromQty > 0) {
      setToQty(toQty + 1)
      setFromQty(fromQty - 1)
      setFromErr(false)
      setToErr(false)
      setQtySame(false)
    }
    else {
      setFromErr(true)
    }
  }

  const reduceToQty = () => {
    setSubmitted(false)
    if (toQty > 0) {
      setToQty(toQty - 1)
      setFromQty(fromQty + 1)
      setFromErr(false)
      setToErr(false)
      setQtySame(false)
    }
    else {
      setToErr(true)
    }
  }

  const handleChange = (e) => {
    setToStore(e.target.value)
    setFromErr(false)
    setToErr(false)
    setFromQty(qtyData)
  }

  const moveStock = () => {
    const data = {
      from: own.name,
      to: toStore,
      taste: own.taste,
      qtyFrom: fromQty,
      qtyTo: toQty
    }
    if (initQty === fromQty) {
      setQtySame(true)
      setSubmitted(false)
    }
    else {
      const response = axios({
        method: 'post',
        url: `${BACKEND_URL}/own/move`,
        data: data
      })

      if (response) {
        setSubmitted(true)
      }
    }
  }

  return (
    <>
      {loading ? fetchStore() : 
        <div className='move-stock-modal-content'>
          <h1>Dorayaki: {capitalize(own.taste)}</h1>
          <div className='black-line'>-</div>
          <h1 className='from-store-name'>From: {capitalize(own.name)}</h1>
          <div className='move-stock-from'>
            <h1>Stock: </h1>
            <button onClick={() => addToQty()}>-</button>
            <h1 className='from-qty-number'>{fromQty}</h1>
            <button onClick={() => reduceToQty()}>+</button>
            {fromErr &&
              <p>
                This dorayaki quantity shouldn't be negative, right?
              </p>
            }
          </div>
          <div className='black-line'>-</div>
          <div className='move-stock-to'>
            <div className='move-stock-to-store'>
              <h1>To: </h1>
              <select
                onChange={handleChange}
              >
                {stores.map((store, index) =>
                  <option
                    key={index}
                    value={store.name}
                  >
                    {capitalize(store.name)}
                  </option>
                )}
              </select>
            </div>
            <div
              className='move-stock-to-qty'
            >
              <h1>Stock: </h1>
              <button onClick={() => reduceToQty()}>-</button>
              <h1>{toQty}</h1>
              <button onClick={() => addToQty()}>+</button>
              {toErr &&
                <p>
                  Are you trying to give negative amount of dorayakis?
                </p>
              }
            </div>
          </div>
          <p
            style={isQtySame ? {color: "black"} : {color:"white"}}
          >
            Did you really just change something?
          </p>
          <p
            style={isSubmitted ? {color: "black"} : {color: "white"}}
          >
            Succesfully moved!
          </p>
          <button
            className='move-stock-modal-button'
            onClick={moveStock}
          >
            Move Stock
          </button>
        </div>
      }
    </>
  )
}

export default MoveStockModal