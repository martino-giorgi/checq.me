const elem = document.getElementById('picker');

let datepicker = new DateRangePicker(elem, {
  buttonClass: 'btn',
  format: 'dd/mm/yyyy',
});

/**
 * Toggle between showing and hiding the form to add a new class
 */
function toggle_show_form() {
  let table = document.getElementById('classroom-table');
  let no_classroom = document.getElementById('no-classrooms');

  let form = document.getElementById('form');
  let btn1 = document.getElementById('show_or_back');
  let btn2 = document.getElementById('show_or_back_1');

  if (form.classList.contains('hidden')) {
    if (document.body.contains(table)) {
      table.classList.add('hidden');
    } else {
      no_classroom.hidden = true;
    }

    form.classList.remove('hidden');
    btn1.classList.add('hidden');
    btn2.classList.remove('hidden');
  } else {
    if (document.body.contains(table)) {
      table.classList.remove('hidden');
    } else {
      no_classroom.hidden = false;
    }
    form.classList.add('hidden');
    btn1.classList.remove('hidden');
    btn2.classList.add('hidden');

    document.querySelectorAll('input:not(#submit-btn), textarea').forEach((el) => {
      el.value = '';
    });

    datepicker.datepickers.forEach((picker) => {
      picker.setDate({ clear: true });
    });
  }
}

function add_mastery_day_frontend() {
  let container = document.getElementById('mastery-days');
  let counter = document.getElementById('counter-m-days');
  let delete_btn = document.getElementById('remove-mastery');

  counter.innerHTML = parseInt(counter.innerHTML) + 1;
  delete_btn.removeAttribute('disabled');

  container.insertAdjacentHTML(
    'beforeend',
    ejs.views_manager_partial_mastery_day({ counter: counter.innerHTML })
  );
}

function remove_mastery_day_frontend() {
  let container = document.getElementById('mastery-days');
  let counter = document.getElementById('counter-m-days');
  let delete_btn = document.getElementById('remove-mastery');

  container.removeChild(document.getElementById(`m-day-${counter.innerHTML}`));
  counter.innerHTML = parseInt(counter.innerHTML) - 1;

  if (counter.innerHTML == '1') {
    delete_btn.setAttribute('disabled', 'disabled');
  }
}

function addClass() {
  let name = document.getElementById('input_name');
  let description = document.getElementById('input_desc');
  let input_is_ordered = document.getElementById('input_is_ordered');

  let name_form = name.value;
  let description_form = description.value;
  let input_is_ordered_form = input_is_ordered.value;
  let start_date = moment(datepicker.datepickers[0].getDate('yyyy-mm-dd') + 'T00:00:00Z');
  let end_date = moment(datepicker.datepickers[1].getDate('yyyy-mm-dd') + 'T00:00:00Z');

  let values = [];

  document.querySelectorAll('#dates').forEach((el) => {
    values.push(el.value);
  });

  if (hasDuplicates(values)) {
    window.FlashMessage.error('Cannot create multiple mastery checks for a single day');
  } else {
    API.create_classroom(
      name_form,
      description_form,
      start_date,
      end_date,
      input_is_ordered_form
    ).then((res) => {
      if (res == null || typeof res === 'undefined') {
        window.FlashMessage.error('Something went wrong, the classroom was not created');
      } else {
        for (let i = 1; i <= values.length; i++) {
          let start_date = '2000-01-01T' + document.getElementById(`start_time_day_${i}`).value;
          let end_date = '2000-01-01T' + document.getElementById(`end_time_day_${i}`).value;
          let iso_day = values[i - 1];
          let classroom_id = res;

          API.create_mastery_day(iso_day, start_date, end_date, classroom_id).then((res) => {
            if (res.status != 200) {
              window.FlashMessage.error(
                'Classroom was created but some mastery days might not have been created'
              );
            } else {
              window.FlashMessage.success('Class was successfully created');
              window.location.href = '/manager';
            }
          });
        }
      }
    });
  }
}

/**
 * Generate an invite link to join a class and when available
 * copy it to the clipboard
 * @param {ObjectId} id the id of the classroom
 */
function generate_invite_link(id) {
  console.log(id);
  let textarea = document.createElement('textarea');
  textarea.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(textarea);
  textarea.setAttribute('readonly', '');

  API.get_invite_link(id)
    .then((link) => {
      console.log(link);
      textarea.value = link;
      textarea.select();
      try {
        document.execCommand('copy');
        window.FlashMessage.success('Invite link copied to clipboard');
      } catch (err) {
        window.FlashMessage.error('Oops, unable to copy');
      }
      document.body.removeChild(textarea);
    })
    .catch((err) => {
      console.log(err);
      window.FlashMessage.error('Error generating link');
      document.body.removeChild(textarea);
    });
}

let API = (function () {
  /**
   * Get an invitation link for the class specified by the id.
   * @param {ObjectId} id the id of the classroom.
   * @returns {Promise} the promise that will contain the invite link
   */
  function get_invite_link(id) {
    return fetch(`/classroom/invite?classroom_id=${id}`).then((res) => {
      return res.json();
    });
  }

  function create_classroom(name, description, start_date, end_date, is_ordered) {
    let body = JSON.stringify({
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      is_ordered: is_ordered,
    });

    return fetch(`/classroom/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    }).then((response) => {
      return response.json();
    });
  }

  function create_mastery_day(iso_day, start_date, end_date, classroom_id) {
    let body = JSON.stringify({
      start: start_date,
      end: end_date,
      _classroomId: classroom_id,
      iso_day_n: iso_day,
    });

    return fetch(`/classroom/mday?classroom_id=${classroom_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  return {
    get_invite_link,
    create_classroom,
    create_mastery_day,
  };
})();

function hasDuplicates(arr) {
  return arr.some(function (item) {
    return arr.indexOf(item) !== arr.lastIndexOf(item);
  });
}
