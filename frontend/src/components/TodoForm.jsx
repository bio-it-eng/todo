import React from 'react'
import { useState } from 'react'

const TodoForm = ({onAdd}) => {
    const [title, setTitle] = useState("");
    const handleSubmit = async (e)=>{
       e.preventDefault();
       if(!title.trim()){
        return;
       }
       await onAdd(title);
       setTitle("");
    };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
        <input 
        type="text"
        placeholder="Enter a todo..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
        <button type="submit">
            Add
        </button>
    </form>
  )
}

export default TodoForm
