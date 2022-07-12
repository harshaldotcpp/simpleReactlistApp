import React from 'react';
import './ListItem.css';
import {getDateTime} from "./listItemUtility.jsx";
function ListItem(props){
  if(props.red === undefined) props.red = {};
  let [isChecked,setChecked] = React.useState(false);
  
  const handleOnChange=()=>{
    
    setChecked((current)=>{
      current = !current;
      return current;
    });
  }
  
  const handleClick =()=>{
    setTimeout(()=> props.remove(props.id),100);
  }
  let todoDate = new Date(props.date);
  let dateTime = getDateTime(todoDate)
  return(
    <li>
      <div className="btn-div">
          <input onClick={handleClick} checked={isChecked} onChange={handleOnChange} type="checkbox" className="remove"/>
      </div>
      <div className="todo-info">
        <div className="todo"><strong>{props.todo}</strong></div>
        <div style={props.red}className="date-time">{dateTime}</div>
      </div>
    </li>
  )
}

export default ListItem;
