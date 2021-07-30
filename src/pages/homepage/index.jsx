import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import AddStoreModal from '../../components/addStoreModal'
import AddDorayakiModal from '../../components/addDorayakiModal'
import DorayakiCardContainer from '../../components/dorayakiCardContainer'
import FilterStoreCard from '../../components/filterStoreCard'
import { BACKEND_URL } from '../../const'
import './style.css'

const HomePage = () => {
  const [stores, setStores] = useState([])
  const [dorayakis, setDorayakis] = useState([])
  const [isStoreModalOpen, setStoreModalOpen] = useState(false)
  const [isDorayakiModalOpen, setDorayakiModalOpen] = useState(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/store`)
      .then(function (res) {
        setStores(res.data)
    })
  }, [isStoreModalOpen])

  useEffect(() => {
    axios.get(`${BACKEND_URL}/dorayaki`)
      .then(function (res) {
        setDorayakis(res.data)
    })
  }, [isDorayakiModalOpen])

  return (
    <div className='home-page'>
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
        <FilterStoreCard storesData={stores} />
      </div>
      <div className='dorayaki'>
        <div className='title'>
          <h1 className='available'>Dorayaki Stock</h1>
          <h3
            className='add-store-dorayaki'
            onClick={() => setDorayakiModalOpen(true)}  
          >
            Add Dorayaki
          </h3>
        </div>
        <div className='black-line'>-</div>
        <DorayakiCardContainer dorayakis={dorayakis} />
      </div>

      <Modal
        isOpen={isStoreModalOpen}
        ariaHideApp={false}      
      >
        <AddStoreModal storesData={stores}/>
        <button
          className='close-store-modal'
          onClick={() => setStoreModalOpen(false)}
        >
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isDorayakiModalOpen}
        ariaHideApp={false}
      >
        <AddDorayakiModal dorayakisData={dorayakis} />
        <button
          className='close-dorayaki-modal'
          onClick={() => setDorayakiModalOpen(false)}
        >
          Close
        </button>
      </Modal>

    </div>
  )
}

export default HomePage