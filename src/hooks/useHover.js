import { useState, useEffect, useRef } from 'react'

export default function useHover() {
   const [hovered, setHovered] = useState(false)
   const hoverRef = useRef(null)

   function enter() {
      setHovered(true)
   }
   
   function leave() {
      setHovered(false)
   }

   useEffect(() => {
      hoverRef.current.addEventListener("mouseenter", enter)
      hoverRef.current.addEventListener("mouseleave", leave)
      
      return () => {
         hoverRef.current.removeEventListener("mouseenter", enter)
         hoverRef.current.removeEventListener("mouseleave", leave)         
      }
   }, [])

   return [hovered, hoverRef]
}