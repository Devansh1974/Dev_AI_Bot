import { useContext } from 'react'
import "../App.css"
import { FaImage } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { FaArrowUp } from "react-icons/fa6";
import { dataContext, prevuser, user } from '../context/UserContext';
import Chat from './Chat';
import { generateResponse } from '../gemini';

function Home() {
let{startRes,setStartRes,popUp,setPopUp,input,setInput,feature,setFeature,prevInput,setPrevInput}=useContext(dataContext)

async function handleSubmit(e){
setStartRes(true)
prevuser.data=user.data;
prevuser.mime_type=user.mime_type;
prevuser.imgUrl=user.imgUrl;
prevuser.prompt(input)
setInput("")
let result = await generateResponse()
console.log(result);
}

function handleImage(e){
  setFeature("upimg")
  let file = e.target.files[0]

  let reader = new FileReader();
  reader.onload=(event) =>{
  let base64 = event.target.result.split(",")[1]
  user.data=base64
  user.mime_type=file.type
  console.log(event);
  user.imgUrl=`data :${user.mime_type}; base64,${user.data}`
  }
  
  // console.log(file);
  reader.readAsDataURL(file)
} 

  return (
    <div className="home">
      <nav>
        <div className='logo'>
          Dev AI Bot
        </div>
      </nav>
      <input type="file" accept='images/*' hidden id = 'inputImg' onChange={handleImage} />
      {!startRes?
      <div className="hero">
        <span id='tag'>WHAT Can I HELP with ?</span>
        <div className="cate">
          <div className="upImg" onClick={()=>{
            document.getElementById("inputImg").click()
            }}>
            <FaUpload />
            <span>Upload Image</span>
          </div>
          <div className="genImg" onClick={()=>setFeature("genImg")}>
            <FaImage />
            <span>Generate Image</span>
          </div>
          <div className="chat" onClick={()=>setFeature("chat")}>
            <IoMdChatbubbles />
            <span>Let's Chat</span>
          </div>
        </div>
      </div>
        :
        <Chat/>
        }
      
      <form className='input-box' onSubmit={(e)=>{
        e.preventDefault() 
        // this prevent default will stop page from reloading
          if(input){
           handleSubmit(e)}
          }
        }>
        {popUp?
          <div className="pop-up">
            <div className="select-up"  onClick={()=>{
            document.getElementById("inputImg").click()
            }}>
            <FaUpload />
            <span>Upload Image</span>
            </div>
            <div className="select-gen" onClick={()=>setFeature("genImg")}>
                <FaImage />
                <span>Generate Image</span>
            </div>
          </div>
        :null}


        <div id='add' onClick={()=>{
          setPopUp(prev=>!prev)
        }}>
          {feature=="genImg"? <FaImage id='genImg' />:<TiPlus />}

        </div>
        <input type='text' placeholder='Ask Something...' onChange={(e)=>setInput(e.target.value)} value={input}/>
        {input?
        <button id='submit'>
        <FaArrowUp />
        </button>
        :null}
      </form>
    </div>
  )
}

export default Home