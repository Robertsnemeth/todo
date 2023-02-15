import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { db } from 'firesbase/clientApp';
import { doc, setDoc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import Input from '@/components/Form Components/Input';
import Label from '@/components/Form Components/Label';
import Button from '@/components/Button';
import { FiEdit2 } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

type Props = {};
type Todo = {
  item: string,
  map: CallableFunction
}

const todos = (props: Props) => {

  const { currentUser, logout } = useAuth();

  const router = useRouter();

  const [ todoItem, setTodoItem ] = useState<string>("");
  const [ allTodoItems, setAllTodoItems ] = useState<[Todo]>();
  const [ dataChange, setDataChange ] = useState<number>();
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [ tempTodoItem, setTempTodoItem ] = useState<string>("");
  const [ tempTodoIdx, setTempTodoIdx ] = useState<number>();

  const handleSubmit = async(e:React.FormEvent) => {
    e.preventDefault();
    const userId = doc(db, 'todos', currentUser.uid);
    await updateDoc(userId, 'todo', arrayUnion({item:todoItem}) )
    setDataChange(Math.random());
    setTodoItem("");
  };

  const handleEdit = (todo:string, index:number) => {
    setIsEditing(!isEditing);
    setTempTodoItem(todo);
    setTempTodoIdx(index);
  }

  const getTodos = async() => {
    const userId = doc(db, 'todos', currentUser.uid);
    const todos = await getDoc(userId);
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

  if(!currentUser) {
    return router.push("/")
  }

  return (
    <main className="flex flex-col gap-2 items-center justify-center min-w-screen min-h-screen">
          <section className='flex gap-5 justify-end'>
            <Link href="/" className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100 w-48 text-center">Home</Link>
            <button className="p-2 rounded text-white bg-indigo-900 hover:bg-indigo-800 focus:bg-white focus:text-indigo-900 transition-colors delay-100 w-48 text-center" onClick={() => handleLogout()}>Logout</button>
          </section>
        <h1 className="text-indigo-800 text-3xl font-extrabold">todos</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
            <Label htmlFor="todo">Todo Item</Label>
            <Input id="todo" state={todoItem} setState={setTodoItem} />
            <Button>Submit</Button>
          </form>
          <section className="flex flex-col gap-2">
            {allTodoItems?.map((todo, index) => (
              todo?.map((item:Todo, index:number) => (
                <div className="flex items-center gap-2">
                    {isEditing && index === tempTodoIdx ? 
                    <div className='flex items-center'>
                      <form className="flex gap-1">
                        <Input inputType="text" state={tempTodoItem} setState={setTempTodoItem}/>
                        <Button>Submit</Button>
                      </form>
                      <RxCross2 size="30" className="text-indigo-900 hover:rotate-180 hover:delay-200 hover:transition-all hover:text-indigo-700 cursor-pointer" onClick={() => setIsEditing(false)}/>
                    </div>
                      :
                      <>
                        <h2 key={index} className="text-indigo-700 border border-indigo-800 p-3 rounded font-bold w-full uppercase">{item.item}</h2>
                        <FiEdit2 size="30" className="text-indigo-900 hover:rotate-180 hover:delay-200 hover:transition-all hover:text-indigo-700 cursor-pointer" onClick={() => {handleEdit(item.item, index)}}/>
                        <RxCross2 size="30" className="text-indigo-900 hover:rotate-180 hover:delay-200 hover:transition-all hover:text-indigo-700 cursor-pointer"/>
                      </>
                    }
                </div>
              ))
            ))}
          </section>
    </main>
  )
}

export default todos