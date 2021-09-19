import React, { useState } from 'react'
import "./styling/TodoItem.css"


export default function TodoItem(props) {
   const [todo, setTodo] = useState({id: props.id, text: props.text})
   const [editing, setEditing] = useState(false)
   const [completed, setCompleted] = useState(false)

   function handleChange(event) {
      const {name, value} = event.target
      setTodo(prevTodo => ({...prevTodo, [name]: value}))
   }

   function handleSubmit(event) {
      event.preventDefault()
      setEditing(false)
   }

   console.log(todo.id)
   console.log(todo.text)
   console.log(todo.completed)
   
   return (
      <div className="todo-item">
         <input 
            type="checkbox" 
            disabled={editing} 
            onChange={() => setCompleted(!completed)}
         />

         { editing ?
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="text"
               value={todo.text} 
               onChange={handleChange} 
            />
         </form> :
         <p
            style={{textDecoration: completed && "line-through"}} 
            onDoubleClick={() => setEditing(true)}
         >
            {todo.text}
         </p> }

         <i
            className={"bi bi-trash-fill"} 
            onClick={() => props.handleDelete(todo.id)}
         />
      </div>
   )
}