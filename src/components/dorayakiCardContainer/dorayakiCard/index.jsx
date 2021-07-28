import React from 'react'
import { capitalize } from '../../../helper'
import './style.css'

const DorayakiCard = ({dorayaki}) => {
  return (
    <div className='dorayaki-card'>
      <h1 className='dorayaki-taste'>{capitalize(dorayaki.taste)}</h1>
      <h3 className='dorayaki-description'>{capitalize(dorayaki.description)}</h3>
    </div>
  )
}

export default DorayakiCard