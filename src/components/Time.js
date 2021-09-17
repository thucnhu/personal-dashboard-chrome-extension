import React, { useState } from 'react'
import "./styling/Time.css"

export default function Time() {
   const [time, setTime] = useState("")
   const [greet, setGreet] = useState("")

   /** Update time and greetings every second */
   setInterval(() => {      
      const currTime = new Date()
      const hour = currTime.getHours()

      setTime(currTime.toLocaleTimeString("en-GB", {timeStyle: "short"}))

      if (hour >= 4 && hour < 12)
         setGreet("Good morning.")
      else if (hour >= 12 && hour < 17)
         setGreet("Good afternoon.")
      else if (hour >= 17 && hour < 24)
         setGreet("Good evening.")
      else setGreet("Good night.")
   }, 1000)

   return (
      <div className="time-area">
         <p className="very-big-txt">{time}</p>
         <p className="big-txt">{greet}</p>
      </div>
   )
}