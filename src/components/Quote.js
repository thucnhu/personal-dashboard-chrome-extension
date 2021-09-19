import React, { useState, useEffect } from 'react'
import "./styling/Quote.css"
import useHover from "../hooks/useHover"

export default function Quote() {
   const [quote, setQuote] = useState("")
   const [author, setAuthor] = useState("")
   const [hovered, hoverRef] = useHover()

   useEffect(() => {
      fetch("https://type.fit/api/quotes")
         .then(response => response.json())
         .then(data => {
            // get random quote from the array
            const randNum = Math.floor(Math.random() * data.length)
            setQuote(data[randNum].text)
            setAuthor(data[randNum].author)
         })
   }, [])

   return (
      <div className="quote-area" ref={hoverRef}>
         {
            hovered ?
            <div>
               <p>{quote}</p>
               <br />
               <div className="author light-txt">
                  <p className="small-txt">{author}</p>
                  <a href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}>
                     <i className="bi bi-twitter" />
                  </a>
               </div>
            </div> :
            <p>{quote}</p>
         }
      </div>
   )
}