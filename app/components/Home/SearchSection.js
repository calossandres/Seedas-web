import React from 'react'
import InputItem from './InputItem'

function SearchSection() {
  return (
    <div className='p-2 md:-5 border-[2px] rounded-xl'>
        <p className='text-[20px]'>get a ride</p>
        <InputItem/>
        <InputItem/>
    </div>
  )
}

export default SearchSection