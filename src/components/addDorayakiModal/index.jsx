import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../const'
import './style.css'

const AddDorayakiModal = ({dorayakisData}) => {
  const [dorayakis, setDorayakis] = useState(dorayakisData)
  const [dorayakiName, setDorayakiName] = useState('')
  const [dorayakiDesc, setDorayakiDesc] = useState('')
  const [dorayakiNameErr, setDorayakiNameErr] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/dorayaki`)
      .then(function (res) {
        setDorayakis(res.data)
      })
  }, [isSubmitted])

  const checkValidation = () => {
    let valid = true
    if (dorayakis.some(dorayaki => dorayaki.taste.toLowerCase() === dorayakiName.toLowerCase())) {
      setDorayakiNameErr(true)
      valid = false
    }

    if (!(/\S/.test(dorayakiName)) ||
      !(/\S/.test(dorayakiDesc))
    ) valid = false
    return valid
  }

  const onSubmit = () => {
    const bool = checkValidation()
    if (!dorayakiNameErr && bool) {
      const response = axios({
        method: 'post',
        url:`${BACKEND_URL}/dorayaki/add`,
        data: {
          taste: dorayakiName,
          description: dorayakiDesc,
          image: "/"
        }
      })

      if (response) {
        setDorayakiNameErr(false)
        setSubmitted(true)
      }
    }
  }

  return (
    <div className='add-dorayaki-modal'>
      <h1>Add Dorayaki</h1>
      <form>
        <label>
          <p style={dorayakiNameErr ? {color: 'red'} : {color: 'white'}}>
            Dorayaki taste already exists
          </p>
          <p style={/\S/.test(dorayakiName) ? {color: 'white'} : {color: 'red'}}>
            Fill this one in!
          </p>
          <span style={{color: 'red'}}>*</span>Dorayaki Taste:
          <input 
            type='text'
            name='name'
            onChange={(e) => {setDorayakiName(e.target.value); setSubmitted(false); setDorayakiNameErr(false)}}
          />
        </label>
        <label>
          <p style={/\S/.test(dorayakiDesc) ? {color: 'white'} : {color: 'red'}}>
            Fill this one in!
          </p>
          <span style={{color: 'red'}}>*</span>Dorayaki Description:
          <input
            type='text'
            name='description'
            onChange={(e) => {setDorayakiDesc(e.target.value); setSubmitted(false)}}
          />
        </label>
      </form>
      <button
        className='submit-button'
        onClick={onSubmit}
      >
        Submit
      </button>
      <p
        style={isSubmitted ? {opacity: '1'} : {opacity: '0'}}
      >
        Submitted successfully!
      </p>
    </div>  
  )
}

export default AddDorayakiModal