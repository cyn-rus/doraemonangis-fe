import React from 'react'
import OwnCard from './ownCard'
import './style.css'

const OwnCardContainer = ({owns}) => {
  return (
    <div className='own-card-container'>
      {owns.map((own, index) => 
        <OwnCard 
          key={index}
          own={own}
        />
      )}
    </div>
  )
}

export default OwnCardContainer