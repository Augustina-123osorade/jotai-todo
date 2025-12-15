"use client";

import { useAtom } from "jotai";

import { isModalOpenAtom, todoAtom, editTodoIdAtom, editInputAtom } from "../atoms";
import Modal from "../ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

export default function MyTodo() {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [todo, setTodo] = useAtom(todoAtom);
  const [_, setEditTodoId]= useAtom(editTodoIdAtom);
  const [, setEditInput]= useAtom(editInputAtom);

  const deleteTodo = (id: string)=> {
    
    const confirmed= confirm("Are you sure you want to delete this todo?")
    
    if (confirmed){
        setTodo(todo.filter((t)=> t.id !==id))

    } 
  };
 
  

  return (
    <div className=" py-20 px-6 md:px-16 lg:px-30 lg:py-10 max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl  text-[#797dc2] mb-4 sm:mb-6"> TODO APP</h1>
      <button onClick={() => setIsModalOpen(true)} className="border rounded px-5 py-3 bg-[#636df3] text-white ">Add Task</button>
      <div className="bg-[#ededf7] border border-[#ededf7] rounded-xl p-5 mt-5">
        

      <ul className="flex flex-col gap-5 " >
        {
         todo.map((item) => (
          <li key={item.id} className="border border-[#ffffff] p-3 mb-2 rounded-l flex items-center gap-3 bg-[#ffffff]">
            < Checkbox
            className="cursor-pointer bg-[#636df3] border-[#636df3]  text-white scale-160 rounded-none"
              checked={item.completed}
              onCheckedChange={()=> {
                setTodo(
                    todo.map((t)=>
                    t.id === item.id
                ? {...t, completed: !t.completed}:t)
                );
              }}
            />
            
            
            
              <div>
                <div className="text-l text-[#969696]">{item.text}</div>
                <div className="text-sm text-[#909090]">{item.createdAt}</div>
              </div>

              <div className="flex gap-2 text-2xl ml-auto  ">
                <button onClick={()=> {
                    deleteTodo(item.id)
                }}
                aria-label="Delete todo"
                className="border border-[#ededf7] p-1 bg-[#ededf7] rounded cursor-pointer">
                    <MdDelete />
                </button>
                <button onClick={()=> {
                    setEditTodoId(String(item.id));
                    setEditInput(item.text);
                    setIsModalOpen(true);

                }}
                aria-label= "Edit todo"
                className="border border-[#ededf7] p-1 bg-[#ededf7] rounded cursor-pointer">
                    <CiEdit />
                </button>
            </div>

              
              
            </li>
          
        ))}
      </ul>
      {isModalOpen && <Modal />}
      </div>
    </div>
  );
}
