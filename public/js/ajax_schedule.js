const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let datepicker = new DateRangePicker(elem, {
    buttonClass: 'btn',
    format: 'dd/mm/yyyy',
    input: [start, end]
});

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

          if 
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
      end: el.end_time,
      classroom_id: el._masteryId.classroom,
      appointment_id:el._id,
    });

    document.querySelector('#newEvent').classList.remove('show');
  })
  data.busy.busy.forEach(el => {
    calendar.addEvent({
      title: "Busy Time Slot",
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
      end: el.end_time,
      classroom_id: el._masteryId.classroom,
      appointment_id:el._id,
    });
  })
}

function addBusyDay() {
  let time_start = document.getElementById('start-time').value
  let time_end = document.getElementById('end-time').value

  let date_start = datepicker.datepickers[0].getDate('yyyy-mm-dd');
  let date_end = datepicker.datepickers[1].getDate('yyyy-mm-dd');

  if (time_start.trim().length == 0 || time_end.trim().length == 0 
      || date_start === undefined || date_end === undefined) {

    console.log('fill in all input fields')
  } else {
    let date_complete_start = moment(date_start + 'T' + time_start);
    let date_complete_end = moment(date_end + 'T' + time_end);

    if ((date_complete_start.isValid() && date_complete_end.isValid())
         && date_complete_start.isBefore(date_complete_end)) {

      calendar.addEvent({
        title: "Busy Time Slot",
        start: date_complete_start.toISOString(),
        end: date_complete_end.toISOString(),
        color: "red"
      });

      API.post_busy_slot(date_complete_start, date_complete_end);

      console.log('dates are correct');
    } else {
      console.log('time interval is invalid')
    }
  }
}

API = (function () {
  function get_appointments() {
    return fetch(`/appointment`).then(res => {
      return res.json();
    })
  }

  function post_busy_slot(start_date, end_date) {
    let busy = {
      busy: [start_date, end_date]
    }

    return fetch('/availability', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(busy)
    })
  }

  function get_current_user() {
    
  }

  return {
    get_appointments,
    post_busy_slot,
  };
})();
