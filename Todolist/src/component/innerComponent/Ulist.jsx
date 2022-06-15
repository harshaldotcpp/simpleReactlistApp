import React from 'react';
import './Ulist.css';


function Ulist(props){
  
  return(
    <React.Fragment>
      <ul style={props.state} className="ul">
        <h3>{props.heading}</h3>
        {props.todo}
      </ul>
  
    </React.Fragment>
  )
}
export default Ulist
