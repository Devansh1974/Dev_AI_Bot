import { createContext, useState } from 'react'
export const dataContext = createContext()

export let user = {
  data : null ,
  mime_type: null,
  imgUrl: null,
};
export let prevuser = {
  data : null ,
  mime_type:null,
  prompt:null,
  imgUrl:null
}
function UserContext({ children }) {

let [startRes,setStartRes]=useState(false)
let [popUp,setPopUp]=useState(false)
let [input,setInput]=useState()
let[feature,setFeature]=useState("chat")
let [prevInput,setPrevInput]=useState()
    let value={
        startRes,setStartRes,
        popUp,setPopUp,
        input,setInput,
        feature,setFeature,
        prevInput,setPrevInput
    }
  return (
    <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
  )
}

export default UserContext
