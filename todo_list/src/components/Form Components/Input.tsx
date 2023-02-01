import React, { FormEvent } from 'react'

type Props = {
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
}

function Input({
  state,
  setState
}:Props) {
    
  const changeHandler = (e:FormEvent) => {
    //@ts-ignore
    setState(e.currentTarget.value)
  }

  return (
    <input type="text" className="p-2 border border-white rounded " value={state} required onChange={(e:FormEvent) => changeHandler(e)}/>
  )
}

export default Input