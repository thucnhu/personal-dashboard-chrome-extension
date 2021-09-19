import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'

import "./styling/MainFocus.css"
import useHover from "../hooks/useHover"
import useClickOutside from "../hooks/useClickOutside"
import mergeRefs from "../mergeRefs"


export default function MainFocus() {
   const [mainFocus, setMainFocus] = useState("")
   const [focused, setFocused] = useState(false)
   const [checked, setChecked] = useState(false)
   const [open, setOpen] = useState(false)

   const [hovered, hoverRef] = useHover()
   const clickRef = useClickOutside(() => setOpen(false))

   const [referenceElement, setReferenceElement] = useState(null)
   const [popperElement, setPopperElement] = useState(null)
   const {styles, attributes} = usePopper(
      referenceElement, 
      popperElement, 
      {placement: "bottom-start"}
   )


   function handleSubmit(event) {
      event.preventDefault()
      setFocused(true)
   }


   function handleClear() {
      setFocused(false)
      setMainFocus("")
      setOpen(false)
   }


   function handleEdit() {
      setFocused(false)
      setOpen(false)
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
      <div className="main-focus-area" ref={mergeRefs(hoverRef, clickRef)}>
         { focused ?
         <div className="focused">
            <h3>TODAY</h3>
            <br />
            <div className="focused-todo">
               { (hovered || open) &&
               <i // check box
                  className={checked ? "far fa-check-square fa-lg" : "light-txt far fa-square fa-lg"}
                  onClick={() => setChecked(!checked)}
               /> }
               <p // main focus
                  className="medium-txt" 
                  style={{
                     textDecoration: checked && "line-through",
                     color: checked && "lightgray"
                  }}
               >
                  {mainFocus}
               </p>
               <div>
                  { (hovered || open) && // drop-down menu
                  <div 
                     className="dots-background" 
                     onClick={() => setOpen(prevOpen => !prevOpen)}
                     ref={setReferenceElement}
                  >
                     <i 
                        className={checked ? "bi bi-three-dots" : "bi bi-three-dots light-txt"} 
                        pop-up={document.getElementById("focus-box")}
                     />
                  </div> }
                  { open &&
                  <div 
                     className="focus-box" 
                     ref={setPopperElement} 
                     style={styles.popper}
                     {...attributes.popper}
                  >
                     <div className="box-element" onClick={handleEdit}>
                        <i className="bi bi-pencil-fill" />
                        <p className="small-txt">Edit</p>
                     </div>
                     <div className="box-element" onClick={handleClear}>
                        <i className="bi bi-x-lg"></i>
                        <p className="small-txt">Clear</p>
                     </div>
                  </div> }
               </div>
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
         </div> }
      </div>
   )
}