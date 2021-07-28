import React from 'react'
import StoreCard from './storeCard'
import './style.css'

const StoreCardContainer = ({stores}) => {
  return (
    <div className='store-card-container'>
      {stores.map((store, index) => 
        <StoreCard
          key={index}
          store={store}
        />
      )}
    </div>
  )
}

export default StoreCardContainer