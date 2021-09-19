import React, { useState, useEffect } from 'react'
import { usePopper } from 'react-popper'

import "./styling/Todo.css"
import TodoItem from "./TodoItem"


export default function Todo() {
   const [open, setOpen] = useState(false)
   const [input, setInput] = useState("")
   const [todoList, setTodoList] = useState([])

   const [referenceElement, setReferenceElement] = useState(null)
   const [popperElement, setPopperElement] = useState(null)
   const {styles, attributes} = usePopper(
      referenceElement, 
      popperElement, 
      {placement: "top-end"}
   )


   function handleDelete(id) {
      if (todoList.length === 1)
         setTodoList([])
      else setTodoList(prevList => prevList.filter(item => item.id !== id))
   }


   function handleSubmit(event) {
      event.preventDefault()
      const newTodo = {
         id: Math.floor(Math.random() * 10000),
         text: input,
      }
      
      setTodoList(prevList => [...prevList, newTodo])
      setInput("")
   }


   /** Retrieve data from the last time */
   useEffect(() => {
      const currTodoList = localStorage.getItem("todoList")
      const currOpen = localStorage.getItem("open")

      if (currOpen && currTodoList) {
         setOpen(JSON.parse(currOpen))
         setTodoList(JSON.parse(currTodoList))
      }
   }, [])

   /** Store current data into storage */
   useEffect(() => {
      localStorage.setItem("todoList", JSON.stringify(todoList))
      localStorage.setItem("open", JSON.stringify(open))
   })


   return (
      <div className="todo-area">
         { open &&
         <div
            className="todo-box" 
            ref={setPopperElement} 
            style={styles.popper} 
            {...attributes.popper}
         >
            <p>{todoList.length ? "Your todo list" : "No todos for now"}</p>
            <div className="all-todos">
               { todoList.map((item, index) => (
                  <TodoItem 
                     key={index}
                     id={item.id} 
                     text={item.text} 
                     handleDelete={handleDelete} 
                  />
               )) }
            </div>
            <form className="todo-form" onSubmit={handleSubmit}>
               <input 
                  type="text" 
                  placeholder="Add a todo" 
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
               />
            </form>
         </div> }

         <p
            className="light-txt menu" 
            onClick={() => setOpen(!open)}
            ref={setReferenceElement}
         >
            Todo
         </p>
      </div>
   )
}