import { useEffect, useState } from "react"



export default function uselocalstorage(key, defaultValue){
    const [value, setValue ] = useState(()=>{
        const jasonvalue = localStorage.getItem(key)
        if (jasonvalue != null) return JSON.parse(jasonvalue)
        
        if(typeof defaultValue === "function"){
            return defaultValue()
          }  else {
                return defaultValue
             }
             } )


             useEffect(()=> {
                localStorage.setItem(key,JSON.stringify(value))
             }, [key, value])

             return[ value, setValue]
}
    
    