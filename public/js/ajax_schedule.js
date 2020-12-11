const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let classrooms;

let datepicker = new DateRangePicker(elem, {
  buttonClass: 'btn',
  format: 'dd/mm/yyyy',
  input: [start, end],
});

window.onclick = function (event) {
  if (event.target == document.getElementById('viewEvent')) {
    closeModal();
  }
};

async function populateSelection() {
  let form_select_class = document.getElementById('exampleFormControlSelect1');
  form_select_class.addEventListener("change", getMasteries);

  classrooms = await API.get_classrooms();

  classrooms.forEach((classroom) => {
    let option = document.createElement('option');
    option.innerHTML = classroom.name;
    option.value = classroom._id;

    form_select_class.appendChild(option);
  });

  getMasteries();
}

function getMasteries() {
  document.getElementById('exampleFormControlSelect2').innerHTML = "";
  
  let classroom_id = document.getElementById('exampleFormControlSelect1').value;
  let i;
  for (i = 0; i < classrooms.length; i++) {
    if (classrooms[i]._id == classroom_id) {
      break;
    }
  }

  classrooms[i].mastery_checks.forEach((mastery) => {
    let form_select_mastery = document.getElementById('exampleFormControlSelect2');

    let option = document.createElement('option');
    option.innerHTML = mastery.name;

    if (mastery.available) {
      form_select_mastery.appendChild(option);
    }
  });
}

function closeModal() {
  document.getElementById('viewEvent').classList.remove('show');
  document.getElementById('backdrop').classList.remove('show');
  document.getElementById('backdrop').style.display = 'none';
  document.getElementById('viewEvent').style.display = 'none';

  document.getElementById('ta-or-student-name').innerHTML = '';
  document.getElementById('duration').innerHTML = '';
}

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
          : 'addMasteryButton dayGridMonth,timeGridWeek,listMonth',
    },
    timeZone: 'local',
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
    eventResizableFromStart: true,
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
        : {
            addMasteryButton: {
              text: 'add mastery check',
              click: function () {
                // Display modal
                document
                  .querySelector('.fc-addMasteryButton-button')
                  .setAttribute('data-toggle', 'modal');
                document
                  .querySelector('.fc-addMasteryButton-button')
                  .setAttribute('data-target', '#newMastery');
              },
            },
          },
    eventDragStart: function (info) {
      start_date_drag = info.event.start.toISOString();
      end_date_drag = info.event.end.toISOString();
    },
    eventDrop: function (info) {
      if (!confirm('Are you sure about this change?')) {
        info.revert();
      } else {
        var new_start = info.event.start.toISOString();
        var new_end = info.event.end.toISOString();

        if (info.event.extendedProps.appointment_id) {
          API.patch_appointment(info.event.extendedProps.appointment_id, new_start, new_end).then(
            (res) => {
              if (res.status != 200) {
                res.text().then((t) => {
                  window.FlashMessage.error(t);
                });
                info.revert();
              } else {
                window.FlashMessage.success('Appointment was moved successfully');
              }
            }
          );
        } else {
          API.patch_busy(start_date_drag, end_date_drag, new_start, new_end).then((res) => {
            if (res.status != 200) {
              res.text().then((text) => {
                window.FlashMessage.error(text);
                info.revert();
                start_date_drag = '';
                end_date_drag = '';
              });
            } else {
              window.FlashMessage.success('Busy day was moved successfully');
            }
          });
        }
      }
    },
    eventResizeStart: function (info) {
      start_date_drag = info.event.start.toISOString();
      end_date_drag = info.event.end.toISOString();
    },
    eventResize: function (info) {
      if (!confirm('Are you sure about this change?')) {
        info.revert();
      } else {
        var new_start = info.event.start.toISOString();
        var new_end = info.event.end.toISOString();

        API.patch_busy(start_date_drag, end_date_drag, new_start, new_end).then((res) => {
          if (res.status != 200) {
            res.text().then((text) => {
              window.FlashMessage.error(text);
              info.revert();
              start_date_drag = '';
              end_date_drag = '';
            });
          } else {
            window.FlashMessage.success('Busy day was changed successfully');
          }
        });
      }
    },
    eventClick: function (info) {
      // Display modal for date (or tooltip)
      document.getElementById('backdrop').style.display = 'block';
      document.getElementById('viewEvent').style.display = 'block';
      document.getElementById('viewEvent').classList.add('show');
      document.getElementById('backdrop').classList.add('show');

      document.getElementById('event-name').innerHTML = info.event.title;

      if (info.event.extendedProps.appointment_id) {
        if (role == 1 || role == 0) {
          document.getElementById(
            'ta-or-student-name'
          ).innerHTML = `With student: ${info.event.extendedProps.student}`;
        } else {
          // TODO: Set TA/Professor name
          document.getElementById(
            'ta-or-student-name'
          ).innerHTML = `With student: ${info.event.extendedProps.ta}`;
        }

        document.getElementById('duration').innerHTML = `Duration: ${moment(info.event.end).diff(
          moment(info.event.start),
          'minutes'
        )} min`;
      }
    },
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
      start: el.start_time,
      end: el.end_time,
      durationEditable: false,

      extendedProps: {
        classroom_id: el._masteryId.classroom,
        appointment_id: el._id,
        description: el._masteryId.description,
        student: el._studentId.name + ' ' + el._studentId.surname,
      },
    });

    document.querySelector('#newEvent').classList.remove('show');
  });

  data.busy.busy.forEach((el) => {
    let test = moment(el[0]).format();
    let test2 = moment(el[1]).format();
    calendar.addEvent({
      title: 'Busy Time Slot',
      start: test,
      end: test2,
      color: 'red',
    });
  });
}

function parse_student_appointments(data) {
  data.forEach((el) => {
    // console.log(el);
    calendar.addEvent({
      title: el._masteryId.name,
      start: el.start_time,
      end: el.end_time,
      durationEditable: false,

      extendedProps: {
        classroom_id: el._masteryId.classroom,
        appointment_id: el._id,
        description: el._masteryId.description,
        ta: el._taId.name + ' ' + el._taId.surname,
      },
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
    window.FlashMessage.error('Please fill in all of the input fields');
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

          window.FlashMessage.success('Busy day was added');
        } else {
          response.text().then((text) => {
            window.FlashMessage.error(text);
          });
        }
      });
    } else {
      window.FlashMessage.error('Time interval is invalid');
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

  function patch_busy(old_start, old_end, new_start, new_end) {
    let body = JSON.stringify({
      old: [old_start, old_end],
      new: [new_start, new_end],
    });

    return fetch(`/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  function patch_appointment(id, new_start, new_end) {
    let body = JSON.stringify({
      appointment_id: id,
      start_date: new_start,
      end_date: new_end,
    });

    return fetch(`/appointment`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  function get_classrooms() {
    return fetch(`/masterycheck/student`).then((res) => {
      return res.json();
    });
  }

  return {
    get_appointments,
    post_busy_slot,
    patch_appointment,
    patch_busy,
    get_classrooms,
  };
})();
