import React from 'react';
import './Navbar.css'


function Navbar(){
  const hideMenu = {
    height:"0",
    width: "auto",
    margin:"0",
  }
  const showMenu = {
    height:"220px",
    margin:"1em",
    width:"auto"
  };
  let [menu,setMenu] = React.useState(hideMenu)
  
  let expand = (event) =>{
    
    if(event.target.checked){
      setMenu(() => showMenu);
    }
    else {
      setMenu(() => hideMenu);
    }
  }
  return (
    <nav>
      <div className="main">
        <h1 className="flexHeading">
          myfucking<span className="todo-title">Todolist..</span>
        </h1>
        <label className="check" for="extendChk">
          <img alt="hamburger" src="https://img.icons8.com/external-febrian-hidayat-outline-color-febrian-hidayat/64/000000/external-hamburger-ui-essential-febrian-hidayat-outline-color-febrian-hidayat.png"/>
          <input type="checkbox" onClick={expand}  name="extendChk" id="extendChk" />
        </label>
      </div>
      <ul style={menu} className="extend">
        <li><h3>Todos</h3></li>
        <li><h3>Completed</h3></li>
        <li><h3>Missed</h3></li>
        <li><h3>Theme</h3></li>
      </ul>
    </nav>

  );
}

export default Navbar;