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
               <input autoComplete="off" type="text" name="q" />
            </form>
            {hovered && <i class="bi bi-google" />}
         </div>
         <br />
         {hovered && <hr />}
      </div>
   )
}