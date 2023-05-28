//Styles:
import './index.css'
//Components:
import SelectSport from "../selectSport";
//React:
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function NewGroup() {

    const URL = "http://localhost:8080"
    
    const navigate = useNavigate();
    const userLS = JSON.parse(localStorage.getItem("sesUser"))
    
    const [redirectToApp, setRedirectToApp] = useState(false);
    const [groupname, setGroupName] = useState("")
    const [sportsArray, setSportsArray] = useState([])//this is a variable to save array info from sports
    const [sports, setSports] = useState("")
    const [inputsResponse, setInputsResponse] = useState("")

    //Making good format for sports:  
    useEffect(() => {
        const sportsString = sportsArray.map((s) => s.value).join(", ")
        setSports(sportsString)
    }, [sportsArray])

    async function createGroup() {
        try {            
            const sendReq = {
                admin: Number(userLS.id),
                name: groupname,
                sports
            };
            //Petition to regist/create newGroup
            const options = {
                method: "POST",
                headers: {
                "Content-type": "application/json"
                },
                body: JSON.stringify(sendReq)
            };
            fetch(`${URL}/group/create`, options)
            .then(response => {
                if (response.ok) {
                    const sendUserReq = {
                        userid: Number(userLS.id),
                        groupname
                    };
                    const options2 = {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(sendUserReq)
                    };
                    fetch(`${URL}/group/addUser`, options2)
                    .then(response => {
                    if (response.ok) {
                        console.log(response.status); // Imprimir el código de estado de la respuesta
                        console.log(response.statusText);
                        setRedirectToApp(true);
                    }
                    })
                    .catch(error => console.error(error)) 
                } else {
                    setInputsResponse("The data provided are not registered")
                }
            })
            .catch(error => console.error(error))
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (redirectToApp) {
            // Redireccionar a "/app" cuando redirectToApp sea true
            navigate('/app');
        }
    }, [redirectToApp, navigate]);

    return(
        <main>
            <h3>Create new Group</h3>
            <div id='inputs'>
                <label htmlFor="userInput">Enter a name for the group:</label>
                <input id='userInput' type="text" onChange={(e) => {setGroupName(e.target.value)}}/>
                <label htmlFor="passInput">Enter the group's associated sports:</label>
                <SelectSport id="sportsInput" setSportsArray={setSportsArray} />
                <p>{inputsResponse}</p>
                <button id='buttonSubmit' onClick={createGroup}>Create group</button>
            </div>
        </main>
    )
}