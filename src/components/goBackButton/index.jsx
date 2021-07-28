import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'

const GoBackButton = () => {
  const history = useHistory()
  
  return (
    <button
      className='go-back'
      onClick={() => history.push('/')}
    >
      ← Go Back
    </button>
  )
}

export default GoBackButton