import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';

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

