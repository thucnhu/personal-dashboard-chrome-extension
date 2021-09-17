import React, { useEffect, useState } from 'react'
import "./styling/MainFocus.css"

export default function MainFocus() {
   const [mainFocus, setMainFocus] = useState("")
   const [focused, setFocused] = useState(false)
   const [done, setDone] = useState(false)

   function handleSubmit(event) {
      event.preventDefault()
      setFocused(true)
   }

   useEffect(() => {
      const currMainFocus = localStorage.getItem("main-focus")
      const currFocused = localStorage.getItem("focused")

      if (currMainFocus && currFocused) {
         setMainFocus(JSON.parse(currMainFocus))
         setFocused(JSON.parse(currFocused))
      }
   }, [])

   useEffect(() => {
      localStorage.setItem("main-focus", JSON.stringify(mainFocus))
      localStorage.setItem("focused", JSON.stringify(focused))
   })

   return (
      <div className="main-focus-area">
         {
            focused ?
            <div className="focused">
               <h3>TODAY</h3>
               <br />
               <div className="focused-todo">
                  <input 
                     type="checkbox" 
                     name="check-focus" 
                     id="check-focus" 
                     onChange={() => setDone(!done)}
                  />
                  <p className="medium-txt">{mainFocus}</p>
                  <i className="bi bi-three-dots" />
               </div>
            </div> :
            <div className="main-focus-form">
               <p className="medium-txt">What's your main focus for today?</p>
               <br />
               <form onSubmit={handleSubmit}>
                  <input 
                     className="medium-txt"
                     type="text" 
                     value={mainFocus} 
                     onChange={event => setMainFocus(event.target.value)}
                  />
               </form>
            </div>
         }
      </div>
   )
}