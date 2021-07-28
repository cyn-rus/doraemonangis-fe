import React from 'react'

const AddStoreModal = () => {
  return (
    <div className='add-store-modal'>
      <h1>Add Store</h1>
        <form>
          <label>
            Store Name:
            <input
              type='text'
              name='name'
            />
          </label>
          <label>
            Store Address:
            <input
              type='text'
              name='address'
            />
          </label>
          <label>
            Store Subdistrict:
            <input
              type='text'
              name='subdistrict'
            />
          </label>
          <label>
            Store Province:
            <input
              type='text'
              name='province'
            />
          </label>
          <input
            type='submit'
            value='submit'
          />
        </form>
    </div>
  )
}

export default AddStoreModal