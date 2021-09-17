import React, { useState, useEffect } from 'react'

import {Todo, Quote, Search, Weather, MainFocus} from "./components"
import "./App.css"

export default function App() {
   const [img, setImg] = useState("")
   const [imgLocation, setImgLocation] = useState("")

   useEffect(() => {
      fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=country")
         .then(response => response.json())
         .then(data => {
            setImg(data.urls.regular)
            if (data.location.city !== null && data.location.country !== null)
               setImgLocation(data.location.city + ", " + data.location.country)
         })
   }, [])

   return (
      <div className="app" style={{backgroundImage: `url(${img})`}}>
         <div className="top-app">
            <Search />
            <Weather />
         </div>
         <br />
         <h1>Time</h1>
         <MainFocus />
         <div className="bottom-app">
            <p className="small-txt location">{imgLocation}</p>
            <Quote />
            <Todo />
         </div>
      </div>
   )
}