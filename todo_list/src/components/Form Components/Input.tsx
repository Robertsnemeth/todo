import React, { FormEvent } from 'react'

type Props = {
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  inputType?: string,
  id?: string
}

function Input({
  state,
  setState,
  inputType,
  id
}:Props) {
    
  const changeHandler = (e:FormEvent) => {
    //@ts-ignore
    setState(e.currentTarget.value)
  }

  return (
    <input id={id} type={inputType === "password" ? "password" : "text"} className="p-2 border border-white rounded " value={state} required onChange={(e:FormEvent) => changeHandler(e)}/>
  )
}

export default Input