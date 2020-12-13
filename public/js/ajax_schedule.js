const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let classrooms;
let event_to_delete;

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
  if (classrooms.length > 0) {
    document.getElementById('exampleFormControlSelect2').innerHTML = '';

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
      option.value = mastery._id;

      if (mastery.available) {
        form_select_mastery.appendChild(option);
      }
    });
  }
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
  role = document.querySelector('#role').innerHTML;
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
    slotMinTime: "08:30:00",
    slotMaxTime: "20:30:00",
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
          document.getElementById(
            'ta-or-student-name'
          ).innerHTML = `With TA: ${info.event.extendedProps.ta}`;
        }

        document.getElementById('duration').innerHTML = `Duration: ${moment(info.event.end).diff(
          moment(info.event.start),
          'minutes'
        )} min`;

        document.getElementById('start_time').innerHTML = 'Starts at: '+ moment(info.event.start).format('DD-MM-YYYY HH:mm').toString();
      }

      if(info.event.title == 'Question Time'){
        document.getElementById('modalCenterTitle').innerHTML = "Question Time"
      }
      else {
        document.getElementById('modalCenterTitle').innerHTML = "Mastery Check"
      }

      if (role == 0 || role == 1) {
        document.getElementById('appointment_id_del').innerHTML =
          info.event.extendedProps.appointment_id;
        document.getElementById('classroom_id_del').innerHTML =
          info.event.extendedProps.classroom_id;
        document.getElementById('start_del').innerHTML = info.event.start.toISOString();
        document.getElementById('end_del').innerHTML = info.event.end.toISOString();
        document.getElementById('event_id_del').innerHTML = info.event.id;

        // console.log(info.event.id);
      }
    },
  });
  API.populateCalendar();

  calendar.render();
});

function parse_Ta_appointments(data) {
  data.appointments.forEach((el) => {
    calendar.addEvent({
      title: el._masteryId.name,
      start: el.start_time,
      end: el.end_time,
      durationEditable: false,
      id: el._id,
      color: el._masteryId.name == 'Question Time' ? 'green' : undefined,

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
      id: makeid(),
    });
  });
}

function parse_student_appointments(data) {
  data.forEach((el) => {
    calendar.addEvent({
      title: el._masteryId.name,
      start: el.start_time,
      end: el.end_time,
      durationEditable: false,
      id: el._id,
      color: el._masteryId.name == 'Question Time' ? 'green' : undefined,

      extendedProps: {
        classroom_id: el._masteryId.classroom,
        appointment_id: el._id,
        description: el._masteryId.description,
        ta: el._taId.name + ' ' + el._taId.surname,
      },
    });
  });
}

function delete_event() {
  let appointment_id = document.getElementById('appointment_id_del').innerHTML;
  let classroom_id = document.getElementById('classroom_id_del').innerHTML;
  let start = document.getElementById('start_del').innerHTML;
  let end = document.getElementById('end_del').innerHTML;
  let id = document.getElementById('event_id_del').innerHTML;

  if (appointment_id != 'undefined') {
    API.delete_appointment(appointment_id, classroom_id).then((result) => {
      if (result.status != 200) {
        window.FlashMessage.error('An error occurred while trying to delete the appointment');
      } else {
        let ev = calendar.getEventById(id);
        ev.remove();
        window.FlashMessage.success('Appointment was deleted successfully');
      }
    });
  } else {
    API.delete_busy_day(start, end).then((res) => {
      if (res.status != 200) {
        window.FlashMessage.error('An error occurred while trying to delete the busy day');
      } else {
        let ev = calendar.getEventById(id);
        ev.remove();
        window.FlashMessage.success('Busy day was deleted successfully');
      }
    });
  }
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

function bookMastery() {
  let mastery_id = document.getElementById('exampleFormControlSelect2').value;

  API.book_appointment(mastery_id).then((response) => {
    if (response.status != 200) {
      response.text().then((t) => {
        window.FlashMessage.error(t);
      });
    } else {
      document.querySelector('body > div.modal-backdrop').classList.remove('show');
      document.querySelector('#newMastery').classList.remove('show');
      window.FlashMessage.success('Mastery check appointment booked successfully');
      calendar.removeAllEvents();
      API.populateCalendar();
    }
  });
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

  function book_appointment(mastery_id) {
    let body = JSON.stringify({
      mastery_id: mastery_id,
    });

    return fetch(`/appointment/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  function delete_appointment(id, classroom_id) {
    return fetch('/appointment/' + id + `?classroom_id=${classroom_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  function delete_busy_day(start_date, end_date) {
    let body = JSON.stringify({
      old_busy: [start_date, end_date],
    });

    return fetch('/availability', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  function populateCalendar() {
    if (role == 0 || role == 1) {
      get_appointments().then((data) => {
        parse_Ta_appointments(data);
      });
    } else if (role == 2) {
      get_appointments().then((data) => {
        parse_student_appointments(data);
      });
    }
  }

  return {
    get_appointments,
    post_busy_slot,
    patch_appointment,
    patch_busy,
    get_classrooms,
    book_appointment,
    delete_appointment,
    delete_busy_day,
    populateCalendar,
  };
})();

function makeid() {
  let length = 15;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
