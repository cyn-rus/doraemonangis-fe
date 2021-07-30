import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import ChangeStockModal from '../../changeStockModal'
import MoveStockModal from '../../moveStockModal'
import { capitalize, capitalizeFirst } from '../../../helper'
import { BACKEND_URL } from '../../../const'
import './style.css'

const OwnCard = ({own}) => {
  const [dorayaki, setDorayaki] = useState([])
  const [qty, setQty] = useState(own.qty)
  const [loading, setLoading] = useState(true)
  const [isStockModalOpen, setStockModalOpen] = useState(false)
  const [isMoveModalOpen, setMoveModalOpen] = useState(false) 

  useEffect(() => {
    axios.get(`${BACKEND_URL}/own/get-qty/${own.name}/${own.taste}`)
    .then(function (res) {
      setQty(res.data)
    })
  }, [isStockModalOpen, isMoveModalOpen, own])
  
  const fetchDorayaki = (own) => {
    axios.get(`${BACKEND_URL}/dorayaki/${own.taste}`)
      .then(function (res) {
        setDorayaki(res.data[0])
        setLoading(false)
      })
  }
  
  return (
    <>
      {loading ? fetchDorayaki(own) : 
        <div
          className='own-card'
          style={qty === 0 ? {display: 'none'} : {}}
        >
          <h1 className='own-taste'>
            {capitalize(dorayaki.taste)}
          </h1>
          <img
            src={dorayaki.image}
            alt={dorayaki.taste}
            className='dorayaki-image'
          />
          <h3 className='own-desc'>
            Description
          </h3>
          <h4 className='own-desc-dorayaki'>
            {capitalizeFirst(dorayaki.description)}
          </h4>
          <h3 className='own-stock'>
            In Stock
          </h3>
          <h4 className='own-qty'>
            {qty}
          </h4>
          <div className='buttons'>
            <button
              className='add-stock-button'
              onClick={() => setStockModalOpen(true)}
            >
              Change Stock
            </button>
            <button
              className='move-stock-button'
              onClick={() => setMoveModalOpen(true)}
            >
              Move Stock
            </button>
          </div>

          <Modal
            isOpen={isStockModalOpen}
            ariaHideApp={false}
          >
            <ChangeStockModal own={own} qtyData={qty}/>
            <button
              className='close-stock-modal'
              onClick={() => setStockModalOpen(false)}
            >
              Close
            </button>
          </Modal>

          <Modal
            isOpen={isMoveModalOpen}
            ariaHideApp={false}
          >
            <MoveStockModal own={own} qtyData={qty}/>
            <button
              className='close-move-modal'
              onClick={() => setMoveModalOpen(false)}
            >
              Close
            </button>
          </Modal>

        </div>
      }
    </>
  )
}

export default OwnCard