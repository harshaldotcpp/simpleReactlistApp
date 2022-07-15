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
const obj = {
    method:"GET",
    headers:{
        'Authorization': `Bearer ${token}`
    }

}


fetch("http://146.190.19.110:8000/api/gettodos",obj)
.then(response => response.json())
.then(data => console.log(data));




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

