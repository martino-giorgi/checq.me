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

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'add event...',
        click: function() {
          var dateStr = prompt('Enter a date in YYYY-MM-DD format');
          var date = new Date(dateStr + 'T00:00:00'); // will be in local time

          if (!isNaN(date.valueOf())) { // valid?
            calendar.addEvent({
              title: 'dynamic event',
              start: date,
              allDay: true
            });
            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        }
      }
    }
  });

  calendar.render();
});