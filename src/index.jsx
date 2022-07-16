import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
}

let token = getCookie("jwt");
const reqInfo ={
    method:"POST",
    headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body:JSON.stringify({
        todo:"some todo",
        date:"2022-07-15 13:15"
    })
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);



addEventListener("load", function() {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})

