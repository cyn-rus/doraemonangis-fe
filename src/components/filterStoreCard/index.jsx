import React, { useState, useEffect } from 'react'
import StoreCardContainer from './storeCardContainer'
import './style.css'

const FilterStoreCard = ({storesData}) => {
  const [stores, setStores] = useState(storesData)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setStores(
      storesData.filter(
        (store) => 
          store.subdistrict.toLowerCase().includes(query.toLowerCase()) ||
          store.province.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, storesData])

  return (
    <div className='search-store'>
      <form className='store-filter'>
        <input
          className='store-filter-bar'
          onChange={(e) => setQuery(e.target.value)}
          type='text'
          placeholder={'Store Subdistrict or Store Province'}
        />
      </form>
      <div className='list-stores'>
        <StoreCardContainer stores={stores} />
      </div>
    </div>
  )
}

export default FilterStoreCard