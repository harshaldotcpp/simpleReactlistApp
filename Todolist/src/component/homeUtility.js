
const overDueColor = { color: "red" };


function setGreeting(count){
  if(count === 1){
    return "Finish Your Task";
  }
  if(count>1){
    return "Finish Your Tasks";
  }
  let date = new Date();
  let time = date.getHours();
  if(time >= 5 && time < 12)
      return "Good Morning🐮";
  if(time >= 12 && time < 17)
      return "Good Afternoon🐱";
  if(time >= 17 && time < 20)
      return "Good Evening🐢";
  
  return "Good Night🐲";
    
}

//update data in local
const updateLocalStorage = (data,count) => {
  localStorage.removeItem("count");
  localStorage.setItem("count",count);
  localStorage.removeItem("todos");
  localStorage.setItem("todos",JSON.stringify(data));
}

//get data from local
const getLocalData = () => {
  let count =  localStorage.getItem("count");
  if(count === null || count === undefined) count = 0;
  else count = parseInt(count);
  let localTodos =  localStorage.getItem("todos");
  localTodos = (localTodos == null || localTodos === undefined )? [] : JSON.parse(localTodos);
  return [localTodos,count];
}






const filterByDate = (compoList,todoListWithDate) => {
 //date wise list which be shown seperate in home component
  let overDue = [];
  let today = [];
  let tomo = [];
  let thisWeek = [];
  let nextWeek = [];
  let thisMonth = [];
  let nextMonth = [];
  
  
  
  /* loop that filter todoListWithDate into  compolist according to date*/
  todoListWithDate.forEach((val,i)=>{
    let todoDate = new Date(val[1]);
    let currentDate = new Date();
    
    if(todoDate.getMonth() === currentDate.getMonth()){
      
      let currDay = currentDate.getDay();
      if(currDay ===0) currDay = 7;

     // add compo to overdue if these condotion mate 
      if(todoDate.getDate() < currentDate.getDate()){
          //adding font color:red style to over due compoonent
          compoList[i][1].props.red = overDueColor;
          overDue.push(compoList[i][1]);
      }
      else if(todoDate.getDate() === currentDate.getDate()){
        //today over due
        if(todoDate.getHours() < currentDate.getHours()){
          compoList[i][1].props.red = overDueColor;
          overDue.push(compoList[i][1]);
      
        }
        else if((todoDate.getHours() === currentDate.getHours())&&todoDate.getMinutes() < currentDate.getMinutes()){
          compoList[i][1].props.red = overDueColor;
          overDue.push(compoList[i][1]);
      
        }
        else
        today.push(compoList[i][1]);
      }// tomorrow
      else if(todoDate.getDate()===currentDate.getDate()+1){
        tomo.push(compoList[i][1]);
      }// this week
      else if(todoDate.getDate()<= (7-currDay)+currentDate.getDate()){
        thisWeek.push(compoList[i][1])
      }// next week
      else if(todoDate.getDate()<=(14-currDay)+currentDate.getDate()){
        nextWeek.push(compoList[i][1]);
      }//this month
      else{
        thisMonth.push(compoList[i][1]);
      }
    }// next month
    else{
      nextMonth.push(compoList[i][1]);
    }
  });
  
  
  //this look for empty list array and create array of style repective to component array
  let heading =["Over Due","Today","Tomorrow","This Week","Next Week","This Month","Next Month"]
  let filteredTodos = [overDue,today,tomo,thisWeek,nextWeek,thisMonth,nextMonth];
 
  filteredTodos.forEach((ftodos,i)=>{
    if(ftodos.length===0)
       heading[i] = {display:"none"};
    else
      heading[i] = {};
  });
  
  return [heading,filteredTodos,["Over Due","Today","Tomorrow","This Week","Next Week","This Month","Next Month"]]

}
  


export { setGreeting, updateLocalStorage, getLocalData,filterByDate}