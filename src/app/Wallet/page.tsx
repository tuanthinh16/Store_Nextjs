import React from 'react'
import CreditCardForm from '../ITEM/WalletCard'

const Wallet = () => {
  return (
    <div className='md:m-10 justify-center'>

      Wallet
      <div className=' p-3  m-2  rounded-xl bg-stone-500 shadow-xl md:max-w-lg '>
        <h1 className='items-center font-bold text-2xl p-2 justify-center'>4442*********9704</h1>
        <h1 className='font-bold text-xl p-2'>DO TUAN THINH</h1>
        <div className='flex justify-between p-2'>
          <p>06/26</p>
          <p>CVC/CVV: ***</p>
        </div>
      </div>
      <CreditCardForm/>
    </div>
  )
}

export default Wallet