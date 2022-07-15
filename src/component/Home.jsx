import React from 'react';
import './Home.css';
import Addbtn from './innerComponent/Addbtn.jsx';
import ListItem from './innerComponent/ListItem.jsx';
import Ulist from "./innerComponent/Ulist.jsx";
import {setGreeting, updateLocalStorage,getLocalData,filterByDate} from "./homeUtility.js";

let id = 0;
//ListItem compopnent array accoriding to state.
let list = [];
//get todos and count from local storage
let countTodo = 0;


function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
}


let createList=(data,date,remove)=>{
  // global function creates list component with todo value
  list.push([id,<ListItem remove={remove} id={id++} todo={data} date={date} />]);
}



function Home(){
  //todo list(2d array with todo and date time) state which will be add to ListItem component array which is in ul tag
  let [todolist,setTodo] = React.useState([]);

 //remove function  qAA
  const remove = (pos) => {
    countTodo--;
    let i = 0;
    while(list[i][0]!==pos) i++;
    list.splice(i,1);
    
    setTodo((current)=>{
      current.splice(i,1);
      updateLocalStorage([...current],countTodo);
      return [...current];
    });
 }
 
  function add(data,date) {
    //add new ListItem in list component array
    countTodo++;
    createList(data,date,remove);
    //as well update state which have todo and date respective to list variable
    setTodo(current=>{
      updateLocalStorage([...current,[data,date]],countTodo);
      return [...current,[data,date]]
    });
  }
  
  //create compo list once app start

  React.useEffect(()=>{
    const token = getCookie("jwt");
    const reqInfo ={
        method:"GET",
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    fetch("http://146.190.19.110:8000/api/gettodos",reqInfo)
    .then(response => response.json())
    .then((data) => {
        countTodo = data.length;
        data.forEach(val=>{
            createList(val.todo,val.date,remove);
         });
        setTodo(()=>data);
    });
  },[]);


  //set greeting string according to time
  let greeting = setGreeting(countTodo);
  /*
   *  filter compolist into arrays of compolist accrodng to date time
  */
  let [ulStyle,todos,todoWhen] = filterByDate(list,todolist);
 //this creating array of different ul areay accroding to date and gime
  let ulCompo = todos.map((val,index)=>{
      return <Ulist  todo={val} state={ulStyle[index]} heading={todoWhen[index]} />
  });
  
  
  
  return(
     <React.Fragment>
      <div className = "home">
       <h2 class="homeTitle">{greeting}</h2>
       {ulCompo}
       <Addbtn run={add} />
      </div>
     </React.Fragment>
  )
};

export default Home;
