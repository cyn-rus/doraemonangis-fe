import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { capitalize } from '../../helper'
import GoBackButton from '../../components/goBackButton'
import OwnCardContainer from '../../components/ownCardContainer'
import AddStockModal from '../../components/addStockModal'
import './style.css'

const Store = (storeName) => {
  const name = storeName.match.params.storeName
  const [owns, setOwns] = useState([])
  const [store, setStore] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setModalOpen] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(async () => {
    await axios.get(`http://localhost:5000/own/${name}`)
    .then(function (res) {
      setOwns(res.data)
    })
  }, [isModalOpen])

  const fetchStoreData = () => {
    axios.get(`http://localhost:5000/store/${name}`)
      .then(function (res) {
        setStore(res.data[0])
    })

    axios.get('http://localhost:5000/dorayaki/count')
    .then(function (res) {
      setTotal(res.data)
    })

    setLoading(false)
  }
  
  return (
    <>
      {loading ? fetchStoreData() : 
        <div className='store-page'>
          <GoBackButton />
          <div className='store-desc'>
            <h1 className='own-page-store-name'>
              {capitalize(store.name)}
            </h1>
            <div className='black-line'>-</div>
            <h3 className='store-address'>
              Address: {capitalize(store.address)}
            </h3>
            <h3 className='own-page-store-subdistrict'>
              Subdistrict: {capitalize(store.subdistrict)}
            </h3>
            <h3 className='own-page-store-province'>
              Province: {capitalize(store.province)}
            </h3>
          </div>
            <div className='own-dorayaki'>
              <div className='own-dorayaki-header'>
                {owns.length === 0 ?
                  <h1>No Dorayaki(s) Available</h1> :
                  <h1>Dorayaki(s) Available</h1>  
                }
                <h3
                  className='add-stock'
                  onClick={() => setModalOpen(true)}
                >
                  Add Stock
                </h3>
              </div>
              <div className='black-line'>-</div>
                <OwnCardContainer owns={owns} />
            </div>

            <Modal
              isOpen={isModalOpen}
              ariaHideApp={false}
            >
              <AddStockModal
                storeName={name}
                ownsData={owns}
                total={total}
              />
              <button
                className='close-add-modal-button'
                style={{marginLeft: '2rem'}}
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </Modal>
        </div>
      }
    </>
  )
}

export default Store