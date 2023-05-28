//Styles:
import './index.css'
//React:
import { useState } from 'react'

export default function Main({URL, messages, setReload}) {
  
    const userLS = JSON.parse(localStorage.getItem("sesUser"))
    const talkLS = JSON.parse(localStorage.getItem("selectedTalk"))

    const [text, setText] = useState("")

    function sendMessage() {
        const sendReq = {
            text,
            transmitter: userLS.id,
            groupReceiver: talkLS.talkId
        }
        const options={
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(sendReq)
        }
        fetch(URL+"/message/create/messageGroups", options)
        .then(response=>{
            if(response.ok){
                setReload("reload")
            } else{
                console.error(response.statusText)
            }
        })
        .catch(error=>console.error(error))
    } 


    return(
        <main>
        <h3>Grupo8</h3>
        <ul id='messages'>
        { messages[0] ? (
                <>
                {
                    messages.map((m, index) => (
                    <li key={index}>{m}</li>
                    ))
                }
                </>
            ) : (
                <p>Send a first message!</p>
            )}
        </ul>
        <div>
            <input id="mensaje" type="text" placeholder="Write a message" onChange={(e) => setText(e.target.value)}/>
            <button className="enviar icon-enviar" onClick={sendMessage}>Enviar</button>
        </div>
    </main>
    )
}