function init(){
  // var a = moment('2020-11-27T10:00:00');
  var a = moment('2020-11-27');
  var x = a.format();
  let test = [
    {title: 'Conference',
    start: x,
    end: '2020-11-27T16:00:00'}
  ]
  drawCalendar(test)
}

function drawCalendar(data){
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listMonth'
    },
    themeSystem:'bootstrap',
    initialView: 'timeGridWeek',
    firstDay: '1',
    navLinks: true, // can click day/week names to navigate views
    // businessHours: true, // display business hours
    editable: true, //set to true only if TA||Professor
    selectable: true,
    allDaySlot: false,
    events:data
  });

  calendar.render();
}

function initCalendar(){

}

let CalendarAPI = function () {
  let calendar;
  function init(){
    var calendarEl = document.getElementById('calendar');
    alendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listMonth'
      },
      themeSystem:'bootstrap',
      initialView: 'timeGridWeek',
      firstDay: '1',
      navLinks: true, // can click day/week names to navigate views
      // businessHours: true, // display business hours
      editable: true, //set to true only if TA||Professor
      selectable: true,
      allDaySlot: false,
      events:[]
    });
  
    calendar.render();
  }

  function addEvent(event){
    calendar.addEvent(event);
  }

  return {
    init,
    addEvent,
  }
}



let API = function () {
  function getAppointments(){
    return fetch
  }
}