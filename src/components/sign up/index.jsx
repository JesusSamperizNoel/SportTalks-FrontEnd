import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
//Components:
import SelectSport from "../selectSport";
//Styles:
import './index.css'

export default function SignUp({URL}) {

    const [name, setName] = useState("")
    const [surname, setSurName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [email, setEmail] = useState("")
    const [bornDate, setBornDate] = useState("")
    const [sportsArray, setSportsArray] = useState([])//this is a variable to save array info from sports
    const [sports, setSports] = useState("")
    const [description, setDescription] = useState("")


    function goToLogin() {


        //GO TO LOGIN component


    }

    function registerUser() {     
        //New user information:
        const userInfo = {
            name,
            surname,
            username,
            password,
            email,
            bornDate,
            sports,
            description
        }
        //Petition to regist/create newUser
        const options={
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userInfo)
        }
        fetch(URL+"/user/create", options)
        .then(response=>{
            if(response.ok){
                alert("Se ha registrado un nuevo usuario en la plataforma, por favor inicie sesion")
            } else{
                console.error(response.statusText)
            }
        })
        .catch(error=>console.error(error))
    }

    function registAndLog() {
        registerUser()
        goToLogin()
    }

    //Making good format for sports:  
    useEffect(() => {
        const sportsString = sportsArray.map((s) => s.value).join(", ")
        setSports(sportsString)
    }, [sportsArray])

    return (
        <div id='regist'>
            <h1>Sport Talks</h1>
            <h4>Talk and run</h4>
            <p>Please register a user on the platform</p>
            <Link to={"/"}><button className='button' id='buttonSubmit'>I already have an account</button></Link>
            <div id='inputs'>
                <label htmlFor="nameInput">Enter your name:</label>
                <input id='nameInput' type="text" required onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="surnameInput">Enter your surname:</label>
                <input id='surnameInput' type="text" required onChange={(e) => setSurName(e.target.value)}/>
                <label htmlFor="userInput">Enter your user alias:</label>
                <input id='userInput' type="text" required onChange={(e) => setUserName(e.target.value)}/>
                <label htmlFor="passInput">Enter a password:</label>
                <input id='passInput' type="password" required onChange={(e) => setPassword(e.target.value)}/>
                <label htmlFor="pass2Input">Please repeat the password:</label>
                <input id='pass2Input' type="password" required 
                    onChange={
                        (e) => {setPassword2(e.target.value)}
                    }
                    onBlur={(e) => {
                        const passInput = document.querySelector('#passInput');
                        if (password !== password2 && passInput !== null) {
                            passInput.setCustomValidity("Passwords don't match");
                            passInput.reportValidity();
                        } else if (passInput !== null) {
                            passInput.setCustomValidity("");
                            passInput.focus();
                        }
                    }}
                />
                <label htmlFor="emailInput">Enter your email:</label>
                <input id='emailInput' type="email" required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="dateInput">Enter your born date:</label>
                <input id='dateInput' type="date" required onChange={
                    (e) => {
                        setBornDate(new Date(e.target.value))
                        if (bornDate >= new Date()) {
                            e.target.setCustomValidity("Please select a date in the past")
                            e.target.reportValidity()
                        } else {
                            e.target.setCustomValidity("")
                        }
                    }
                }/>
                <label htmlFor="sportsInput">Enter your principal Sport:</label>
                <SelectSport id="sportsInput" setSportsArray={setSportsArray} />
                <label htmlFor="descInput">Enter a brief description about yourself:</label>
                <input id='descInput' type="text" required onChange={(e) => setDescription(e.target.value)}/>
                <button id='buttonSubmit' onClick={registAndLog}><Link to={"/app"}>Submit</Link></button>
            </div>
        </div>
    )
}