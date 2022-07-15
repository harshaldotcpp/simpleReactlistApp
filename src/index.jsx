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

