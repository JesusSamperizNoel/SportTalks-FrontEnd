import { useNavigate } from 'react-router-dom'
//Styles:
import './index.css'
//React:
import { useCallback, useState, useEffect } from 'react'

export default function NewTalk() {

    const URL = "http://localhost:8080"
    const navigate = useNavigate();
    const userLS = JSON.parse(localStorage.getItem("sesUser"))

    const [redirectToApp, setRedirectToApp] = useState(false);
    const [pattern, setPattern] = useState("")
    const [results, setResults] = useState([])

    function searchUsersResults() {
        //GET petition to get GROUP Talk MESSAGES
        fetch(`${URL}/user/pattern/${pattern}`)
        .then(response => {
            if(response.ok){
                return response.json()
            } else{
                console.error(response.statusText)
            }
        })
        .then(results => {
            const updatedResults = results.map(r => {
                return { ...r, resultType: 'user' };
            });
            setResults(updatedResults);
        })
        .catch(error=>console.error(error))
    }

    function searchGroupsResults() {
        //GET petition to get GROUP Talk MESSAGES
        fetch(`${URL}/group/pattern/${pattern}`)
        .then(response => {
            if(response.ok){
                return response.json()
            } else{
                console.error(response.statusText)
            }
        })
        .then(results => {
            const updatedResults = results.map(r => {
                return { ...r, resultType: 'group' };
            });
            setResults(updatedResults);            
        })
        .catch(error=>console.error(error))
    }

    const startNewTalk = useCallback((resultType, e)  => {
        const startNewTalkAsync = async () => {
            if (resultType === 'user') {
                //New User Talk information:
                const sendReq = {
                    user1: Number(userLS.id),
                    user2: Number(e.id)
                }
                //Petition to create new users Talk:
                const options={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(sendReq)
                }
                fetch(`${URL}/user/usertalkuser`, options)
                .then(response=>{
                    if(response.ok){
                        alert("Se ha iniciado una nueva Talk")
                        setRedirectToApp(true)
                    } else{
                        console.error(response.statusText)
                    }
                })
                .catch(error=>console.error(error))
            } else {
                //New Group Talk information:
                const sendReq = {
                    userid: Number(userLS.id),
                    groupname: e.name
                }
                //Petition to create new group Talk:
                const options={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(sendReq)
                }
                fetch(`${URL}/group/addUser`, options)
                .then(response=>{
                    if(response.ok){
                        alert("Se ha iniciado una nueva Talk")
                        setRedirectToApp(true)
                    } else{
                        console.error(response.statusText)
                    }
                })
                .catch(error=>console.error(error))
            } 
        }
        startNewTalkAsync()              
    }, [URL, userLS.id])

    useEffect(() => {
        if (redirectToApp) {
            // Redireccionar a "/app" cuando redirectToApp sea true
            navigate('/app');
        }
    }, [redirectToApp, navigate]);

    return(
        <main>
            <h3>New Talk</h3>
            <div id="inputs">
                <input type='text' onChange={(e) => setPattern(e.target.value)}></input>
                <div id='buttons'>
                    <button onClick={searchUsersResults}>Search users</button>
                    <button onClick={searchGroupsResults}>Search groups</button>
                </div>    
            </div>
            <div id="results">
                { results[0] ? ( //if true:
                    <>
                    {
                        results.map((t, index) => (
                            <button
                                id={t.id}
                                key={index}
                                name={t.name}
                                onClick={() => startNewTalk(t.resultType, t)}
                            >
                                {t.name} {t.surname}
                            </button>
                        ))
                    }
                    </>
                ) : ( //if else:
                    <p>Enter a name to search results!</p>
                )}
            </div>
        </main>
    )
}