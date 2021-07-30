import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../const'
import './style.css'

const AddStoreModal = ({storesData}) => {
  const [stores, setStores] = useState(storesData)
  const [storeName, setStoreName] = useState("")
  const [storeAddress, setStoreAddress] = useState("")
  const [storeSubdistrict, setStoreSubdistrict] = useState("")
  const [storeProvince, setStoreProvince] = useState("")
  const [storeNameErr, setStoreNameErr] = useState(false)
  const [sameLocErr, setSameLocErr] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/store`)
      .then(function (res) {
        setStores(res.data)
      })
  }, [isSubmitted])

  const onChangeStoreName = (e) => {
    setStoreName(e.target.value)
    setSubmitted(false)
    setStoreNameErr(false)
  }

  const checkValidation = () => {
    let valid = true
    
    if (stores.some(store => store.name.toLowerCase().localeCompare(storeName.toLowerCase()) === 0)) {
      setStoreNameErr(true)
      valid = false
    }

    if (stores.some(store => 
      store.address.toLowerCase() === storeAddress.toLowerCase() && 
      store.subdistrict.toLowerCase() === storeSubdistrict.toLowerCase() &&
      store.province.toLowerCase() === storeProvince.toLowerCase()
    )) {
      setSameLocErr(true)
      valid = false
    }

    if (!(/\S/.test(storeName)) ||
      !(/\S/.test(storeAddress)) ||
      !(/\S/.test(storeSubdistrict)) ||
      !(/\S/.test(storeProvince))
    ) {
      valid = false
    }

    return valid
  }

  const onSubmit = () => {
    const valid = checkValidation()
    if (valid) {
      const response = axios({
        method: 'post',
        url: `${BACKEND_URL}/store/add`,
        data: {
          name: storeName,
          address: storeAddress,
          subdistrict: storeSubdistrict,
          province: storeProvince
        }
      })
      
      if (response) {
        setStoreNameErr(false)
        setSameLocErr(false)
        setSubmitted(true)
      }
    }
  }

  return (
    <div className='add-store-modal'>
      <h1>Add Store</h1>
        <form>
          <label>
            <p style={storeNameErr ? {color: 'red'} : {color: 'white'}}>
              Store name already exists
            </p>
            <p style={/\S/.test(storeName) ? {color: 'white'} : {color: 'red'}}>
              Fill this one in!
            </p>
            <span style={{color: 'red'}}>*</span>Store Name:
            <input
              type='text'
              name='name'
              onChange={(e) => onChangeStoreName(e)}
            />
          </label>
          <label>
            <p style={/\S/.test(storeAddress) ? {color: 'white'} : {color: 'red'}}>
              Fill this one in!
            </p>
            <span style={{color: 'red'}}>*</span>Store Address:
            <input
              type='text'
              name='address'
              onChange={(e) => {setStoreAddress(e.target.value); setSubmitted(false); setSameLocErr(false)}}
            />
          </label>
          <label>
            <p style={/\S/.test(storeSubdistrict) ? {color: 'white'} : {color: 'red'}}>
              Fill this one in!
            </p>
            <span style={{color: 'red'}}>*</span>Store Subdistrict:
            <input
              type='text'
              name='subdistrict'
              onChange={(e) => {setStoreSubdistrict(e.target.value); setSubmitted(false); setSameLocErr(false)}}
            />
          </label>
          <label>
            <p style={/\S/.test(storeProvince) ? {color: 'white'} : {color: 'red'}}>
              Fill this one in!
            </p>
            <span style={{color: 'red'}}>*</span>Store Province:
            <input
              type='text'
              name='province'
              onChange={(e) => {setStoreProvince(e.target.value); setSubmitted(false); setSameLocErr(false)}}
            />
          </label>
        </form>
        <p
          style={sameLocErr ? {color: 'red'} : {color: 'white'}}
        >
          This place already has its owner
        </p>
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

export default AddStoreModal