import React from 'react'

type Props = {
  value: string
}

function Input({value}:Props) {
    
  return (
    <input type="text" className="p-2 border border-white rounded " value={value} />
  )
}

export default Input