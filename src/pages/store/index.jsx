import React, { useState } from 'react'
import axios from 'axios'
import { capitalize } from '../../helper'
import GoBackButton from '../../components/goBackButton'
import OwnCardContainer from '../../components/ownCardContainer'
import './style.css'

const Store = (storeName) => {
  const name = storeName.match.params.storeName
  const [owns, setOwns] = useState([])
  const [store, setStore] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStoreData = () => {
    axios.get(`http://localhost:5000/store/${name}`)
      .then(function (res) {
        setStore(res.data[0])
        setLoading(false)
      })
      
    axios.get(`http://localhost:5000/own/${name}`)
      .then(function (res) {
        setOwns(res.data)
      })
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
              {owns.length === 0 ?
                <h1 className='stock-title'>
                  No Dorayaki(s) Available
                </h1> :
                <div className='own-stocks'>
                  <h1 className='stock-title'>Dorayaki(s) Available</h1>
                  <div className='black-line'>-</div>
                  <OwnCardContainer owns={owns} />
                </div>
              }
            </div> 
        </div>
      }
    </>
  )
}

export default Store