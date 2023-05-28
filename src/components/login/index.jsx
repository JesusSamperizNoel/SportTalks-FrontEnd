import { Link, useNavigate   } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './index.css'

export default function Login({URL}) {
    
    const navigate = useNavigate();
    const [userid, setUserId] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    //Variable to show the state to the user:
    const [inputsResponse, setInputsResponse] = useState("")

    function checkUser() {
        const userInfo = {
          name,
          password
        };
    
        // Petition to login with user name and password
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(userInfo)
        };
    
        fetch(URL + "/user/login", options)
          .then(response => {
            if (response.ok) {
              setInputsResponse("")
              alert("Welcome " + name)
              return response.json()
            } else {
              setInputsResponse("The data provided are not registered")
              console.error(response.json().statusText)
            }
          })
          .then(res => {
            setUserId(res.id)
          })
          .catch(error => console.error(error))
      }
    
      useEffect(() => {
        if (userid) {
          // GET petition to get user for save in localStorage
          fetch(`${URL}/user/${userid}`)
            .then(response => {
              if (response.ok) {
                return response.json()
              }
            })
            .then(res => {
                localStorage.removeItem('sesUser')
                localStorage.setItem('sesUser', JSON.stringify(res))
            })
            .catch(error => console.error(error))
            .finally(() => {
              navigate('/app')
            });
        }
      }, [URL, userid, navigate]);

    return (
        <div id='login'>
            <h1>Sport Talks</h1>
            <h4>Talk and run</h4>
            <button id='buttonSubmit'><Link to={"/signIn"}>Don't have an acount?</Link></button>
            <div id='inputs'>
                <label htmlFor="userInput">Enter a user:</label>
                <input id='userInput' type="text" onChange={(e) => {setName(e.target.value)}}/>
                <label htmlFor="passInput">Enter a password:</label>
                <input id='passInput' type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <p>{inputsResponse}</p>
            </div>
            <button id='buttonSubmit' onClick={checkUser}>Go to Talk</button>
        </div>
    )
}