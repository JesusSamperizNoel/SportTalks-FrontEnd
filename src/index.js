import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import SignUp from './components/sign up';
import NewTalk from './components/newTalk';
import NewGroup from './components/newGroup';
import App from './App';

const URL = "http://localhost:8080"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login URL={URL}/>
  },
  {
    path: "/app",
    element: <App/>,
    children: [
      {
        path: "",
        element: <><Main URL={URL}/></>

      },
      {
        path: "otra",
        element: <h1>Otra</h1>
      }
    ]
  },
  {
    path: "/signIn",
    element: <SignUp/>
  },
  {
    path: "/NewTalk",
    element: <NewTalk/>
  },
  {
    path: "/NewGroup",
    element: <NewGroup/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
