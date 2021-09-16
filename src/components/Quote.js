import React, { useState, useEffect } from 'react'
import "./Quote.css"
import useHover from "../hooks/useHover"

export default function Quote() {
   const [quote, setQuote] = useState("")
   const [author, setAuthor] = useState("")
   const [hovered, hoverRef] = useHover()

   useEffect(() => {
      fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random")
         .then(response => response.json())
         .then(data => {
            setQuote(data.data[0].quoteText)
            setAuthor(data.data[0].quoteAuthor)
         })
   }, [])

   return (
      <div className="quote-area" ref={hoverRef}>
         {
            hovered ?
            <div>
               <p>{quote}</p>
               <br />
               <p className="small-txt">{author}</p>
            </div> :
            <p>{quote}</p>
         }
      </div>
   )
}