import React from 'react'
import DorayakiCard from './dorayakiCard'
import './style.css'

const DorayakiCardContainer = ({dorayakis}) => {
  return (
    <div className='dorayaki-card-container'>
      {dorayakis.map((dorayaki, index) => 
        <DorayakiCard
          key={index}
          dorayaki={dorayaki}
        />
      )}
    </div>
  )
}

export default DorayakiCardContainer