import React from 'react';
import './Home.css';
import Addbtn from './innerComponent/Addbtn.jsx';
import ListItem from './innerComponent/ListItem.jsx';
import Ulist from "./innerComponent/Ulist.jsx";
import {setGreeting, updateLocalStorage,getLocalData,filterByDate} from "./homeUtility.js";

let id = 0;
//ListItem compopnent array accoriding to state.
let list = [];
// this flag will be true if state list added in component list once app start
let isSetLocalData = false;

//get todos and count from local storage
let [localTodos,countTodo] =  getLocalData();
console.log(localTodos)
if(localTodos == null) localTodos = []
let createList=(data,date,remove)=>{
  // global function creates list component with todo value
  list.push([id,<ListItem remove={remove} id={id++} todo={data} date={date} />]);
}



function Home(){
  //todo list(2d array with todo and date time) state which will be add to ListItem component array which is in ul tag
  let [todolist,setTodo] = React.useState(localTodos);

 //remove function
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

  if(!isSetLocalData){
    isSetLocalData = true;

    todolist.forEach(val=>{
      createList(val[0],val[1],remove);
    });
    
  }


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
