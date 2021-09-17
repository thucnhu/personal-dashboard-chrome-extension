import { useState, useEffect, useRef } from "react";

export default function useClick() {
   const [open, setOpen] = useState(false)
   const clickRef = useRef(null)

   function click() {
      setOpen(!open)
   }

   function close() {
      if (open) setOpen(false)
   }

   useEffect(() => {
      clickRef.current.addEventListener("click", click)
      window.addEventListener("click", close)

      return () => {
         clickRef.current.removeEventListener("click", click)
         window.removeEventListener("click", close)
      }
   }, [])

   return [open, clickRef]
}