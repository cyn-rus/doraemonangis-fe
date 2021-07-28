import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import AddStoreModal from '../../components/addStoreModal'
import DorayakiCardContainer from '../../components/dorayakiCardContainer'
import StoreCardContainer from '../../components/storeCardContainer'
import { BACKEND_URL } from '../../const'
import './style.css'

const HomePage = () => {
  const [stores, setStores] = useState([])
  const [dorayakis, setDorayakis] = useState([])
  const [loading, setLoading] = useState(true)
  const [isStoreModalOpen, setStoreModalOpen] = useState(false)
  const [isDorayakiModalOpen, setDorayakiModalOpen] = useState(false)

  const fetchData = () => {
    setLoading(false)
    axios.get('http://localhost:5000/store')
      .then(function (res) {
        setStores(res.data)
    })
    axios.get('http://localhost:5000/dorayaki')
      .then(function (res) {
        setDorayakis(res.data)
      })
  }  

  return (
    <div className='home-page'>
      {loading && fetchData()}
      <div className='store'>
        <div className='title'>
          <h1 className='available'>Stores Available</h1>
          <h3
            className='add-store-dorayaki'
            onClick={() => setStoreModalOpen(true)}
          >
            Add Store
          </h3>
        </div>
          <div className='black-line'>-</div>
        <StoreCardContainer stores={stores} />
      </div>
      <div className='dorayaki'>
        <div className='title'>
          <h1 className='available'>Dorayaki Stock</h1>
          <h3 className='add-store-dorayaki'>Add Dorayaki</h3>
        </div>
        <div className='black-line'>-</div>
        <DorayakiCardContainer dorayakis={dorayakis} />
      </div>

      <Modal
        isOpen={isStoreModalOpen}
        ariaHideApp={false}      
      >
        <AddStoreModal />
        <button
          className='close-store-modal'
          onClick={() => setStoreModalOpen(false)}
        >
          Close
        </button>
      </Modal>

    </div>
  )
}

export default HomePage