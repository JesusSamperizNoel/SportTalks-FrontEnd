//Styles:
import './styles/core.css';
//React:
import { useState } from 'react';

//Used Components:
import Header from './components/header';
import Aside from './components/aside';
import Footer from './components/footer';
import Main from './components/main';

function App() {

const [messages, setMessages] = useState([]) 
const [reload, setReload] = useState("")

  return (
    <>
      <Header />
      <Aside setMessages={setMessages} reload={reload} setReload={setReload}/>
      <Main messages={messages} setReload={setReload}/>
      <Footer />
    </>
  )
}

export default App;
