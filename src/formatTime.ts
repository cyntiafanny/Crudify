export const formatDate = (receivedDate?: any) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let day = days[receivedDate.getDay()];
  let date = receivedDate.getDate();
  let month = months[receivedDate.getMonth()];
  let year = receivedDate.getFullYear();

  return day + ", " + date + " " + month + " " + year;
}

export const formatTime = (receivedTime: any) => {
  let hours = receivedTime.getHours().toString();
  let minutes = receivedTime.getMinutes().toString();

  if(hours.length < 2) {
    hours = "0" + hours
  }
  if(minutes.length < 2) {
    minutes = "0" + minutes
  }

  return hours + ":" + minutes
}

export const generateGreeting = (receivedTime: any) => {
  const currentHour = receivedTime.getHours();

  if (currentHour >= 6 && currentHour < 11) {
    return('Good morning,');
  } else if (currentHour >= 11 && currentHour < 15) {
    return('Good day,');
  } else if (currentHour >= 15 && currentHour < 17) {
    return('Good afternoon,');
  } else if (currentHour >= 17 && currentHour < 19) {
    return('Good evening, ');
  } else if (currentHour >= 19 || currentHour < 6) {
    return('Good night, ');
  }
}
