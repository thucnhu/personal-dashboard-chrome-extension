import React, { useState, useEffect } from 'react'
import {Todo, Quote, Search, Weather, MainFocus, Time} from "./components"
import "./App.css"


export default function App() {
   const [img, setImg] = useState("")
   const [imgLocation, setImgLocation] = useState("")
   let intervalId

   /** Get a new image every 6 hours */
   useEffect(() => {
      intervalId = setInterval(() => {
         fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=country")
            .then(response => response.json())
            .then(data => {
               setImg(data.urls.full)
               if (data.location.city !== null && data.location.country !== null)
                  setImgLocation(data.location.city + ", " + data.location.country)
         })
      }, 1000 * 60 * 60 * 6)
   }, [])
  

   /** Retrieve data in the storage and set it to the current states */
   useEffect(() => {
      const currImg = localStorage.getItem("img")
      const currImgLocation = localStorage.getItem("img-location")

      if (currImg && currImgLocation) {
         setImg(JSON.parse(currImg))
         setImgLocation(JSON.parse(currImgLocation))
      }
   }, [])


   /** Catch image into storage */
   useEffect(() => {
      localStorage.setItem("img", JSON.stringify(img))
      localStorage.setItem("img-location", JSON.stringify(imgLocation))
   })


   return (
      <div className="app" style={{backgroundImage: `url(${img})`}}>
         <div className="top-app">
            <Search />
            <Weather />
         </div>
         <br />
         <Time />
         <MainFocus />
         <div className="bottom-app">
            <p className="small-txt location">{imgLocation}</p>
            <Quote />
            <Todo />
         </div>
      </div>
   )
}