import React, { useState } from 'react'
import "./styling/Search.css"
import useHover from "../hooks/useHover"

export default function Search() {
   const [hovered, hoverRef] = useHover()

   return (
      <div className="search-area" ref={hoverRef}>
         <div className="search-bar">
            <i class="bi bi-search"></i>
            <form action="https://google.com/search" method="GET">
               <input type="text" name="q" />
            </form>
            {hovered && <i class="light bi bi-google"></i>}
         </div>
         <br />
         {hovered && <hr className="hr-light" />}
      </div>
   )
}