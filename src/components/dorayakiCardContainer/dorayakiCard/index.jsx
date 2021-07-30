import React from 'react'
import { capitalize, capitalizeFirst } from '../../../helper'
import './style.css'

const DorayakiCard = ({dorayaki}) => {
  return (
    <div className='dorayaki-card'>
      <h1 className='dorayaki-taste'>{capitalize(dorayaki.taste)}</h1>
      <img
        className='dorayaki-image'
        alt={dorayaki.taste}
        src={dorayaki.image}
      />
      <h3 className='dorayaki-description'>{capitalizeFirst(dorayaki.description)}</h3>
    </div>
  )
}

export default DorayakiCard