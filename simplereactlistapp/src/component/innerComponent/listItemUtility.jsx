
const months = {
  0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr",
  4: "May", 5: "Jun", 6: "Jul", 7:"Aug",
  8: "Sup", 9: "Oct", 10: "Nov",11:"Dec"
};

const days = {
  0:"Sun",1:"Mon",2:"Tue",3:"Wed",
  4:"Thus",5:"Fri",6:"Sat"
}

const getDateTime = (dateTime) => {
  let currentDay = new Date();
  let day = days[dateTime.getDay()];
  let month = months[dateTime.getMonth()];
  let date = dateTime.getDate();
  let year = dateTime.getFullYear();
  let dateTimeStr = `${day}, ${month} ${date}, ${year}, `;
  let hour = dateTime.getHours();
  let time = "";
  if(hour > 12)
    time = time + (hour-12)+":";
  else time = time + (hour)+":";

  time += dateTime.getMinutes();
  if(hour > 12) time += "PM";
  else time+="AM";
  

  dateTimeStr += time;
  if(currentDay.getDate() === date){
     return "Today, " + time;
  }
  if(currentDay.getDate()+1 ===date)
     return "Tomorrow, " + time;
     
  return dateTimeStr;
  
}


export {getDateTime}