import React from 'react'
import Button from './Button'
import Input from './Form Components/Input'
import Label from './Form Components/Label'

type Props = {}

function Login({}: Props) {
  return (
    <section>
        <form action="">
            <Label htmlFor='email'>Email</Label>
            <Input value=""/>
            <Button>Submit</Button>
        </form>
    </section>
  )
}

export default Login