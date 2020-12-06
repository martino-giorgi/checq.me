const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let datepicker = new DateRangePicker(elem, {
    buttonClass: 'btn',
    format: 'dd/mm/yyyy',
    input: [start, end]
});

// function init(){
//   // // var a = moment('2020-11-27T10:00:00');
//   // var a = moment('2020-11-27');
//   // var x = a.format();
//   // let test = [
//   //   {title: 'Conference',
//   //   start: x,
//   //   end: '2020-11-27T16:00:00'}
//   // ]
//   // drawCalendar(test)
//   CalendarAPI.init();
// }

// function drawCalendar(data){
//   var calendarEl = document.getElementById('calendar');
//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'addEventButton,dayGridMonth,timeGridWeek,listMonth'
//     },
//     themeSystem:'bootstrap',
//     initialView: 'timeGridWeek',
//     firstDay: '1',
//     navLinks: true, // can click day/week names to navigate views
//     // businessHours: true, // display business hours
//     editable: true, //set to true only if TA||Professor
//     selectable: true,
//     allDaySlot: false,
//     events:data,
//     customButtons: {
//       addEventButton: {
//         text: 'add event...',
//         click: function() {
//           var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//           var date = moment(dateStr);

//           console.log(date)

//           if (date.isValid()) {
//             console.log('ciao')

//             addEvent({
//               title: 'dynamic event',
//               start: date,
//               allDay: true
//             })

//             alert('Great. Now, update your database...');
//           } else {
//             alert('Invalid date.');
//           }
//         }
//       }
//     }
//   });

//   calendar.render();
// }


// let CalendarAPI = function () {
//   let calendar;
//   function init(){
//     var calendarEl = document.getElementById('calendar');
//     // calendar = new FullCalendar.Calendar(calendarEl, {
//     //   headerToolbar: {
//     //     left: 'prev,next today',
//     //     center: 'title',
//     //     right: 'dayGridMonth,timeGridWeek,listMonth'
//     //   },
//     //   themeSystem:'bootstrap',
//     //   initialView: 'timeGridWeek',
//     //   firstDay: '1',
//     //   navLinks: true, // can click day/week names to navigate views
//     //   // businessHours: true, // display business hours
//     //   editable: true, //set to true only if TA||Professor
//     //   selectable: true,
//     //   allDaySlot: false,
//     //   events:[]
//     // });
  
//     // calendar.render();

//     calendar = new FullCalendar.Calendar(calendarEl, {
//       headerToolbar: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'addEventButton,dayGridMonth,timeGridWeek,listMonth'
//       },
//       themeSystem:'bootstrap',
//       initialView: 'timeGridWeek',
//       firstDay: '1',
//       navLinks: true, // can click day/week names to navigate views
//       // businessHours: true, // display business hours
//       editable: true, //set to true only if TA||Professor
//       selectable: true,
//       allDaySlot: false,
//       // events:[],
//       customButtons: {
//         addEventButton: {
//           text: 'add event...',
//           click: function() {
//             var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//             var event = {
//               title: 'dynamic event',
//               start: moment("2020-12-06T08:30"),
//               allDay: false,
//               end: moment("2020-12-06T13:30")
//             }

//             if (true) {
//               $('#calendar').fullCalendar('renderEvent', event);
//               alert('Great. Now, update your database...');
//             } else {
//               alert('Invalid date.');
//             }

//           }
//         }
//       }
//     });
  
//     calendar.render();
//   }

//   function addEvent(event){
//     console.log('add event')
//     calendar.addEvent(event);
//     calendar.rerenderEvents()
//     // calendar.rerender();
//   }

//   return {
//     init,
//     addEvent,
//   }
// }


// let API = function () {
//   function getAppointments(){
//     return fetch
//   }
// }

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'addEventButton dayGridMonth,timeGridWeek,listMonth'
    },
    themeSystem:'bootstrap',
    initialView: 'timeGridWeek',
    firstDay: '1',
    navLinks: true, // can click day/week names to navigate views
    editable: true, //set to true only if TA||Professor
    selectable: true,
    allDaySlot: false,
    contentHeight: 'auto',
    nowIndicator: true,
    eventOverlap: false,
    customButtons: {
      addEventButton: {
        text: 'add busy day',
        click: function() {
          // Display modal
          document.querySelector('.fc-addEventButton-button').setAttribute('data-toggle', 'modal');
          document.querySelector('.fc-addEventButton-button').setAttribute('data-target', '#newEvent');

          document.getElementById('newEvent')

          // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

          // if (!isNaN(date.valueOf())) {
          //   calendar.addEvent({
          //     title: 'dynamic event',
          //     start: date,
          //     allDay: false
          //   });
          // } else {
          //   alert('Invalid date.');
          // }
        }
      }
    },
    // TODO: Send new data to database if drop of date is detected
    // TODO: Check if user is student of that class
    // eventDrop: function(info) {
    //   alert(info.event.title + " was dropped on " + info.event.start.toISOString());
  
    //   if (!confirm("Are you sure about this change?")) {
    //     info.revert();
    //   }
    // }

    // TODO: Send new data to database if resizing of event has finished
    // TODO: Check if user is student of that class
    // eventResize: function(info) {
    // alert(info.event.title + " end is now " + info.event.end.toISOString());

    // if (!confirm("is this okay?")) {
    //   info.revert();
    // }
    //}
  });

  API.get_appointments().then(data => {
    parse_Ta_appointments(data);
  });

  calendar.render();
});


function parse_Ta_appointments(data) {
  console.log(data);

  data.appointments.forEach(el => {
    calendar.addEvent({
      title: el._masteryId.name,
      description: el._masteryId.description,
      student: el._studentId.name + " " + el._studentId.name,
      start: el.start_time,
      end: el.end_time
    });
  })
  data.busy.busy.forEach(el => {
    calendar.addEvent({
      title: "busy",
      start: el[0],
      end: el[1],
      color: "red"
    })
  })
}

function parse_student_appointments(data){
  data.forEach(el => {
    calendar.addEvent({
      title: el._masteryId.name,
      description: el._masteryId.description,
      student: el._studentId.name + " " + el._studentId.name,
      start: el.start_time,
      end: el.end_time
    });
  })
}


API = (function () {

  function get_appointments() {
    return fetch(`/appointment`).then(res => {
      return res.json();
    })
  }

  return {
    get_appointments,
  };
})();
