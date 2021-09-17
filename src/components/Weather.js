import React, { useState, useEffect } from 'react'
import "./styling/Weather.css"

export default function Weather() {
   const [weatherIcon, setWeatherIcon] = useState("")
   const [temp, setTemp] = useState()
   const [city, setCity] = useState("")

   useEffect(() => {
      navigator.geolocation.getCurrentPosition(position => {
         fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
            .then(response => {
               if (!response.ok) 
                  throw Error("Weather data not available")

               return response.json()
            })
            .then(data => {
               setWeatherIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
               setTemp(Math.round(data.main.temp))
               setCity(data.name)
            })
            .catch(error => console.log(error))
      })
   }, [])

   return (
      <div className="weather-area">
         <div className="icon-temp">
            <img src={weatherIcon} alt="weather icon" />
            <p className="medium-txt">{temp}º</p>
         </div>
         <p className="small-txt">{city}</p>
      </div>
   )
}