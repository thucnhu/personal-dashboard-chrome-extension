import React, { useState } from 'react'

import "./styling/TodoItem.css"
import useClickOutside from '../hooks/useClickOutside'


export default function TodoItem(props) {
   const [todo, setTodo] = useState({id: props.id, text: props.text})
   const [editing, setEditing] = useState(false)
   const [completed, setCompleted] = useState(false)
   const clickRef = useClickOutside(() => setEditing(false))

   function handleChange(event) {
      const {name, value} = event.target
      setTodo(prevTodo => ({...prevTodo, [name]: value}))
   }

   function handleSubmit(event) {
      event.preventDefault()
      setEditing(false)
   }
   
   return (
      <div className="todo-item">
         <input 
            type="checkbox" 
            onChange={() => setCompleted(!completed)}
         />
         <div ref={clickRef}>
            { editing ?
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  name="text"
                  value={todo.text} 
                  onChange={handleChange} 
                  autoComplete="off"
               />
            </form> :
            <p
               className="todo-text"
               style={{
                  textDecoration: completed && "line-through",
                  color: completed && "gray"
               }} 
               onDoubleClick={() => setEditing(true)}
            >
               {todo.text}
            </p> }
         </div>

         <i
            className={"bi bi-trash-fill"} 
            onClick={() => props.handleDelete(todo.id)}
         />
      </div>
   )
}