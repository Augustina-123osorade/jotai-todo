"use client";
import { useAtom } from "jotai";
import { isModalOpenAtom, inputAtom, todoAtom, editTodoIdAtom, editInputAtom } from "../atoms";
import { MdOutlineCancel } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";


export default function Modal() {
  const [_, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [input, setInput] = useAtom(inputAtom);
  const [todo, setTodo] = useAtom(todoAtom);
  const [editTodoId, setEditTodoId]= useAtom(editTodoIdAtom);
  const [editInput, setEditInput]= useAtom(editInputAtom);

  const isEditing = editTodoId !== null;
  

  return (
    <div>
      <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
            <button onClick={() => {
                setIsModalOpen(false);
                setEditTodoId(null);
                setEditInput('');
            }


            } className=" float-right">
              <MdOutlineCancel />
            </button>
          <h2 className="text-center">{isEditing ? "Edit Todo": "Add New Todo"}</h2>
          <input
            type="text"
            value={isEditing ? editInput : input}
            onChange={(e) => {
                if (isEditing){
                    setEditInput(e.target.value)
                } else {
                    setInput(e.target.value)
                }
            }
                
            }
            placeholder={isEditing ? "Edit your Todo": "Enter your Todo"}
            className="w-full border rounded p-2 mb-4"
          />
          <div>
            
            <button
              className="items-center bg-blue-100 text-black px-4 py-2 rounded cursor-pointer flex mx-auto"
              onClick={() => {
                if(isEditing){
                    if(editInput.trim()){
                        setTodo(
                            todo.map((t)=> t.id === editTodoId ? {... t, text: editInput}: t)
                        );
                        setEditInput('');
                        setEditTodoId(null);
                        setIsModalOpen(false);
                    }

                } else {
                    if (input.trim()) {
                  setTodo([
                    ...todo,
                    { id: crypto.randomUUID(), text: input, completed: false, createdAt: new Date().toLocaleString(),},
                  ]);
                  setInput("");
                  setIsModalOpen(false);
                }
              }}
                }
                
            >
                
              <IoAddCircleOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
