import React from 'react';
import './Addbtn.css';




function Addbtn(props){
  
// All state variables
  let [date,setDate] = React.useState("");
  let [time,setTime] = React.useState("");
  let [expand,setExpand] = React.useState({height:"0",width:"0",padding:"0",opacity:"0"});
  let [val,setVal] = React.useState("");
  
  //add menu expand function
  const expandMenu = (event)=>{
    if(event){
      setExpand(()=>{
      return {height:"100%",width:"100%",padding:"5%",opacity:"1"}
      });
    }
    else
      setExpand(()=>{
        return {height:"0",width:"0",padding:"0",opacity:"0"}
      })
  }
  
  //get text from input area
  let gettodo = (event) => {
     let todo = event.target.value;
     setVal(()=>todo);
  }
  //do operation related to addbtn open if true remove, add if false
  const add = (e) => {
    let isopen = e.target.checked;
    if(isopen){
      expandMenu(isopen);
      return;
    }
    if(val === ""){
      expandMenu(isopen);
      return;
    }
    if(date==="" || time===""){
      alert("enter date time");
      e.target.checked = true;
      return;
    }
    expandMenu();
    let dt = date +" " +time;
    props.run(val,dt);
    setVal(()=>"")
  }
  
  //update date on set
  const updateDate = (e) => {
    setDate(e.target.value);
  }
  const updateTime = (e) =>{
    setTime(e.target.value)
  }
  
  return(
    <React.Fragment>
    <div style={expand} id="btn-segment">
      <div className="add-todo">
        <div><em>What is to be done</em></div>
       <input value={val} onChange={gettodo} id="todo-text" className="" type="text" />
     </div>
       <div className="date">
         <div><em>due date</em></div>
         <input type="date" onChange={updateDate} />
         <input type="time" onChange={updateTime} />
       </div>
    </div>
    
     <label class="add-btn" for="chkbtn">
        <div>+</div>
        <input onClick={(e)=>{add(e);}} className="button" id="chkbtn" type="checkbox"/>
      </label>
    </React.Fragment>
  
  )
}


export default Addbtn;