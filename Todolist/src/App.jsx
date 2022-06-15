import React from 'react';
import './App.css';
import Navbar from './component/Navbar.jsx';
import Home from './component/Home.jsx';
/****/ 
function App() {
  return (
    <React.Fragment> 
    <div className="page">
       <Navbar /> 
       <Home />
    </div>
    </React.Fragment>
    
  );
}

export default App;
