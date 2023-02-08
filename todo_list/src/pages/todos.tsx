import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from 'firesbase/clientApp';
import { doc, setDoc, getDoc, arrayUnion, updateDoc, FieldValue } from 'firebase/firestore';
import { useAuth } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Input from '@/components/Form Components/Input';
import Label from '@/components/Form Components/Label';
import Button from '@/components/Button';

type Props = {};
type Todo = {
  item: string
}

const todos = (props: Props) => {

  const { currentUser, logout } = useAuth();

  const router = useRouter();

  const [ todoItem, setTodoItem ] = useState<string>("");
  const [ allTodoItems, setAllTodoItems ] = useState<[Todo]>();
  const [ dataChange, setDataChange ] = useState<number>();

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    const userId = doc(db, 'todos', currentUser.uid);
    await updateDoc(userId, 'todo', arrayUnion({item:todoItem}) )
    setDataChange(Math.random());
    setTodoItem("");
  };

  const getTodos = async() => {
    const userId = doc(db, 'todos', currentUser.uid);
    const todos = await getDoc( userId);
    if(todos.data()) {
      const data = todos.data();
      console.log(data?.todo, "todos")
      setAllTodoItems([data?.todo])
    }
  }

  useEffect(() => {
    getTodos()
  }, [dataChange])

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <main className="flex flex-col gap-2 items-center justify-center min-w-screen min-h-screen">
        <h1 className="text-indigo-800 text-3xl font-extrabold">todos</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <Label htmlFor="todo">Todo Item</Label>
            <Input id="todo" state={todoItem} setState={setTodoItem} />
            <Button>Submit</Button>
          </form>
          <div className="flex flex-col gap-2">
            {allTodoItems?.map((todo, index) => (
              <h2 key={index} className="text-indigo-700 border border-indigo-800 p-3  rounded font-bold w-full uppercase">{todo.item}</h2>
            ))}
          </div>
        <Link href="/" className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100">Home</Link>
        <button className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100" onClick={() => handleLogout()}>Logout</button>
    </main>
  )
}

export default todos