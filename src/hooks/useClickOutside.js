import { useEffect, useRef } from "react";

export default function useClickOutside(handler) {
   const clickRef = useRef()

   function clickOutside(event) {
      if (!clickRef.current.contains(event.target))
         handler()
   }

   useEffect(() => {
      document.addEventListener("mousedown", clickOutside)

      return () => {
         document.removeEventListener("mousedown", clickOutside)
      }
   }, [])

   return clickRef
}