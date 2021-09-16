import React, { useState, useEffect } from 'react'

import {Todo, Quote} from "./components"
import "./App.css"

export default function App() {
   const [img, setImg] = useState("")
   const [location, setLocation] = useState("")

   useEffect(() => {
      fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=country")
         .then(response => response.json())
         .then(data => {
            setImg(data.urls.regular)
            if (data.location.city !== null && data.location.country !== null)
               setLocation(data.location.city + ", " + data.location.country)
         })
   }, [])

   return (
      <div className="app" style={{backgroundImage: `url(${img})`}}>
         <h4>Weather</h4>
         <br />
         <h1>Time</h1>
         <h1>Main focus</h1>
         <div className="bottom-app">
            <p className="small-txt location">{location}</p>
            <Quote />
            <Todo />
         </div>
      </div>
   )
}