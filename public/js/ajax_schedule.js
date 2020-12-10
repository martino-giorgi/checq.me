const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let datepicker = new DateRangePicker(elem, {
  buttonClass: 'btn',
  format: 'dd/mm/yyyy',
  input: [start, end],
});

document.addEventListener('DOMContentLoaded', function () {
  let role = document.querySelector('#role').innerHTML;
  var calendarEl = document.getElementById('calendar');

  var start_date_drag;
  var end_date_drag;

  calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right:
        role == 0 || role == 1
          ? 'addEventButton dayGridMonth,timeGridWeek,listMonth'
          : 'dayGridMonth,timeGridWeek,listMonth',
    },
    themeSystem: 'bootstrap',
    initialView: 'timeGridWeek',
    firstDay: '1',
    navLinks: true,
    editable: role == 0 || role == 1 ? true : false,
    selectable: true,
    allDaySlot: false,
    contentHeight: 'auto',
    nowIndicator: true,
    eventOverlap: false,
    customButtons:
      role == 0 || role == 1
        ? {
            addEventButton: {
              text: 'add busy day',
              click: function () {
                // Display modal
                document
                  .querySelector('.fc-addEventButton-button')
                  .setAttribute('data-toggle', 'modal');
                document
                  .querySelector('.fc-addEventButton-button')
                  .setAttribute('data-target', '#newEvent');
              },
            },
          }
        : {},
    eventDragStart: function(info) {
      start_date_drag = info.event._instance.range.start.toISOString();
      end_date_drag = info.event._instance.range.end.toISOString();
    },
    eventDrop: function(info) {
      if (!confirm("Are you sure about this change?")) {
        info.revert();
      } else {
        var new_start = info.event._instance.range.start.toISOString();
        var new_end = info.event._instance.range.end.toISOString();
        
        API.patch_appointment(start_date_drag, end_date_drag, new_start, new_end)
      }
    },
    

    // TODO: Send new data to database if resizing of event has finished
    // TODO: Check if user is student of that class
    // eventResize: function(info) {
    // alert(info.event.title + " end is now " + info.event.end.toISOString());

    // if (!confirm("is this okay?")) {
    //   info.revert();/
    // }
    //}
  });

  if (role == 0 || role == 1) {
    API.get_appointments().then((data) => {
      parse_Ta_appointments(data);
    });
  } else if (role == 2) {
    API.get_appointments().then((data) => {
      parse_student_appointments(data);
    });
  }

  calendar.render();
});

function parse_Ta_appointments(data) {
  data.appointments.forEach((el) => {
    calendar.addEvent({
      title: el._masteryId.name,
      description: el._masteryId.description,
      student: el._studentId.name + ' ' + el._studentId.name,
      start : el.start_time,
      end: el.end_time,
      classroom_id: el._masteryId.classroom,
      appointment_id: el._id,
    });

    document.querySelector('#newEvent').classList.remove('show');
  });
  
  data.busy.busy.forEach((el) => {
    calendar.addEvent({
      title: 'Busy Time Slot',
      start: el[0],
      end: el[1],
      color: 'red',
    });
  });
}

function parse_student_appointments(data) {
  console.log(data);
  data.forEach((el) => {
    calendar.addEvent({
      title: el._masteryId.name,
      description: el._masteryId.description,
      student: el._studentId.name + ' ' + el._studentId.name,
      start: el.start_time,
      end: el.end_time,
      classroom_id: el._masteryId.classroom,
      appointment_id: el._id,
    });
  });
}

function addBusyDay() {
  let time_start = document.getElementById('start-time').value;
  let time_end = document.getElementById('end-time').value;

  let date_start = datepicker.datepickers[0].getDate('yyyy-mm-dd');
  let date_end = datepicker.datepickers[1].getDate('yyyy-mm-dd');

  if (
    time_start.trim().length == 0 ||
    time_end.trim().length == 0 ||
    date_start === undefined ||
    date_end === undefined
  ) {
    window.FlashMessage.error("Please fill in all of the input fields");
  } else {
    let date_complete_start = moment(date_start + 'T' + time_start, 'YYYY-MM-DDTHH:mm', true);
    let date_complete_end = moment(date_end + 'T' + time_end, 'YYYY-MM-DDTHH:mm', true);

    if (
      date_complete_start.isValid() &&
      date_complete_end.isValid() &&
      date_complete_start.isBefore(date_complete_end)
    ) {
      API.post_busy_slot(date_complete_start, date_complete_end).then((response) => {
        if (response.status == 200) {
          calendar.addEvent({
            title: 'Busy Time Slot',
            start: date_complete_start.toISOString(),
            end: date_complete_end.toISOString(),
            color: 'red',
          });

          document.querySelector('.modal').classList.remove('show');
          document.querySelector('.modal-backdrop').classList.remove('show');

          window.FlashMessage.success("Busy day was added");
        } else {
          response.text().then(text => {
            window.FlashMessage.error(text);
          })
        }
      });
    } else {
      window.FlashMessage.error("Time interval is invalid");
    }
  }
}

API = (function () {
  function get_appointments() {
    return fetch(`/appointment`).then((res) => {
      return res.json();
    });
  }

  function post_busy_slot(start_date, end_date) {
    let busy = {
      busy: [start_date, end_date],
    };

    return fetch('/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(busy),
    });
  }

  function patch_appointment(old_start, old_end, new_start, new_end) {
    let times = {
      old: [old_start, old_end],
      new: [new_start, new_end]
    }

    console.log(old_start, old_end, new_start, new_end)

    return fetch(`/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(times)
    });
  }

  return {
    get_appointments,
    post_busy_slot,
    patch_appointment,
  };
})();
