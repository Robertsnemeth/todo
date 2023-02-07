import { useAuth } from '@/contexts/UserContext'
import { FormEvent, useState } from 'react'
import Button from './Button'
import Input from './Form Components/Input'
import Label from './Form Components/Label'
import { useRouter } from 'next/navigation';

type Props = {}

function Login({}: Props) {

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ errors, setErrors ] = useState("");
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ isRegistering, setIsRegistering ] = useState(false)

  const { login, signUp } = useAuth();

  const router = useRouter();

  async function handleSubmit(e:FormEvent) {
    e.preventDefault();
    if(isLoggingIn) {
      try {
        await login(email, password)
        setIsLoggingIn(false)
        router.push('/todos')
      } catch (err) {
        setErrors("Incorrect Email or Password")
        setIsLoggingIn(false)
      }
      return 
    }
    if(isRegistering) {
      try {
        await signUp(email, password)
        setIsRegistering(false)
        router.push('/todos')
    } catch (err) {
      setErrors("Incorrect Email or Password");
      setIsRegistering(false)
    }
    return 
    }
    setEmail("");
    setPassword("");
  }

  return (
        <form onSubmit={(e:FormEvent) => handleSubmit(e)} className="flex flex-col gap-2 w-3/4 lg:w-1/4">
          {errors && <div className="rounded p-2 border border-red-700 text-center text-red-700 transition-all">{errors}</div>}
            <Label htmlFor='email'>Email</Label>
            <Input state={email} setState={setEmail}/>
            <Label htmlFor='password'>Password</Label>
            <Input state={password} setState={setPassword} inputType="password"/>
            <Button setState={setIsLoggingIn} state={isLoggingIn}>Login</Button>
            <Button setState={setIsRegistering} state={isRegistering}>Register</Button>
        </form>
  )
}

export default Login