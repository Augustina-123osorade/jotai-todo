'use client'

import { useAtom } from 'jotai'
import { todoAtom } from '../atoms'
import {useState} from 'react'

export default function MyTodo() {
    const [todos, setTodos] = useAtom(todoAtom)
    //console.log(todos)
    const [newTodo, setNewTodo] = useState('')

    return (
        <div className='gap-5 flex flex-col items-center justify-center border p-10 rounded shadow-lg bg-white'>
            <h1 className='px-20 font-bold'>Add a Todo</h1>
             <div className='flex gap-3'>
                <input type="text" value= {newTodo}  placeholder='add a new todo' className='border rounded p-2' onChange={(e)=> setNewTodo(e.target.value)}/>
            <div className='bg-amber-100 border-amber-50 rounded p-3 cursor-pointer'>
                <button onClick={()=>{
                    if(!newTodo.trim()) {
                        return;
                    }
                setTodos([...todos, {text: newTodo, id: Date.now(), completed: false}])
                setNewTodo('')
                
            }}>Add Todo</button>
            </div>
             </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                    </li>
                ))}
            </ul>
           
            

        </div>
    )
}