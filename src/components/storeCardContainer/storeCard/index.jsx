import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { capitalize } from '../../../helper'
import { BACKEND_URL } from '../../../const'
import './style.css'

const StoreCard = ({store}) => {
  const [toggleButton, setToggleButton] = useState(false)
  const [isDeleted, setDeleted] = useState(false)
  const history = useHistory()

  const onClickStore = () => {
    if (toggleButton) {
      axios({
        method: 'delete',
        url: `${BACKEND_URL}/store/${store.name}`
      })
      setDeleted(true)
    }
    else {
      history.push(`/store/${store.name}`)
    }
  }

  return (
    <div
      style={isDeleted ? {display: "none"} : {}}
      className='store-card'
      onClick={onClickStore}
    >
      <h1 className='store-name'>
        {capitalize(store.name)}
      </h1>
      <h3 className='store-place'>
        {capitalize(store.province)}, {capitalize(store.subdistrict)}
      </h3>
      <button
        className='delete-button'
        onMouseEnter={() => setToggleButton(true)}
        onMouseLeave={() => setToggleButton(false)}
      >Delete</button>
    </div>
  )
}

export default StoreCard