const classroom_id = new URLSearchParams(window.location.search).get('classroom_id');
var mastery_id = undefined;
var topic_id = undefined;

/**
 * Handle the button to delete mastery checks by removing the mastery check from the view, from the db and every item in the db
 * linked to that mc.
 * Finally refresh the list of mc.
 * @listens click
 */
function add_delete_event() {
  document.querySelectorAll('.delete_btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let mastery_id = btn.parentNode.parentNode.querySelector('#id_container').dataset.id;
      let classroom_id = new URLSearchParams(window.location.search).get('classroom_id');

      fetch(`/masterycheck?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }).then(() => {
        render_mastery_modal();
      });
    });
  });
}

/**
 * Handle the button to edit a masterycheck by showing the form filled with the old values of the mc
 * @listens click
 */
function add_edit_event() {
  document.querySelectorAll('.edit_btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      mastery_id = btn.parentNode.parentNode.querySelector('#id_container').dataset.id;
      let card_body = btn.parentNode.parentNode.querySelector('.card-body');

      let current_values = {
        name: card_body.querySelector('h2').innerHTML,
        description: card_body.querySelector('#element_desc').innerHTML,
        available:
          card_body.querySelector('#element_durat').innerHTML.split('|')[1].trim() == 'Available'
            ? true
            : false,
        appointment_duration: card_body
          .querySelector('#element_durat')
          .innerHTML.split('|')[0]
          .trim()
          .replace('Duration: ', ''),
        github_repo_name: card_body
          .querySelector('#github_repo_card')
          .innerHTML.split(':')[1]
          .trim(),
      };

      card_body.innerHTML = ejs.views_manager_mastery_mastery_add({ current: current_values });
    });
  });
}

/**
 * Handle to button to add a new mc by showing the form.
 * @listens click
 */
function add_new_event() {
  document.querySelectorAll('.new_topic_btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      mastery_id = btn.parentNode.parentNode.querySelector('#id_container').dataset.id;
      let card_body = btn.parentNode.parentNode.querySelector('.card-body');
      card_body.innerHTML = ejs.views_manager_classrooms_new_topic({ current: {} });
    });
  });
}

/**
 * Handle the button to edit a topic by showing the form and filling the inputs with the old values
 * @listens
 */
function add_edit_topic_event() {
  document.querySelectorAll('.edit_topic_btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      mastery_id = btn.dataset.mastery_id;
      topic_id = btn.dataset.id;

      let card_body = btn.parentNode.parentNode.parentNode;
      let current_values = {
        name: btn.dataset.name,
        description: btn.dataset.description,
      };
      card_body.innerHTML = ejs.views_manager_classrooms_new_topic({ current: current_values });
    });
  });
}

/**
 * Refresh the view of the mastery checks list and handle all event listeners
 */
function render_mastery_modal() {
  API_mastery.get_masteries().then((res) => {
    document.getElementById(
      'mastery-modal-body'
    ).innerHTML = ejs.views_manager_mastery_mastery_list({ result: res });
    add_delete_event();
    add_edit_event();
    add_new_event();
    add_edit_topic_event();
    show_question_form();
  });
}

/**
 * Get the content of the form and add a new topic to the db
 */
function create_topic() {
  let body = {
    name: document.getElementById('topic_input_name').value,
    description: document.getElementById('topic_input_description').value,
  };
  console.log(body, "prima");

  if (body.name != '' && body.description != '') {
    API_mastery.add_topic(JSON.stringify(body)).then((res) => {
      if (res.status == 200) {
        window.FlashMessage.success('Topic Added');
        render_mastery_modal();
      } else {
        window.FlashMessage.error('Could not add new topic, try again later');
      }
    });
  } else {
    window.FlashMessage.error('Please fill all the fields!');
  }
}

/**
 * Get the content of the form and update the values of a topic.
 */
function edit_topic() {
  let body = {
    name: document.getElementById('input_name').value,
    description: document.getElementById('input_description').value,
  };

  if (body.name != '' && body.description != '') {
    API_mastery.edit_topic(JSON.stringify(body)).then((res) => {
      if (res.status == 200) {
        window.FlashMessage.success('Topic Edited');
        render_mastery_modal();
      } else {
        window.FlashMessage.error('Could not edit the topic, try again later');
      }
    });
  } else {
    window.FlashMessage.error('Please fill in all the fields!');
  }
}

/**
 * Get the value of the form and edit the content of a mastery check in the db.
 * Finally refresh the view with the list of mc
 */
function edit_mastery() {
  let body = {
    name: document.getElementById('input_name').value,
    description: document.getElementById('input_description').value,
    appointment_duration: parseInt(document.getElementById('input_duration').value),
    github_repo_name: document.getElementById('github_repo').value,
    available: document.getElementById('check_available').checked,
  };

  if (
    body.name != '' &&
    body.description != '' &&
    body.appointment_duration != '' &&
    body.github_repo_name != ''
  ) {
    API_mastery.edit_mastery(JSON.stringify(body)).then((res) => {
      if (res.status == 200) {
        window.FlashMessage.success('Mastery Check Edited');
        render_mastery_modal();
      } else {
        window.FlashMessage.error('Could not edit mastery check, try again later');
      }
    });
  } else {
    window.FlashMessage.error('Please fill all the fields!');
  }
}

/**
 * Get the content of the form and add a new masterycheck in the db.
 * Finally refresh the view with the list of mc
 */
function create_mastery() {
  let body = {
    name: document.getElementById('input_name').value,
    description: document.getElementById('input_description').value,
    appointment_duration: parseInt(document.getElementById('input_duration').value),
    available: document.getElementById('check_available').checked,
    github_repo_name: document.getElementById('github_repo').value,
  };

  if (body.name != '' && body.description != '' && body.appointment_duration != '') {
    API_mastery.post_mastery(JSON.stringify(body)).then((res) => {
      console.log(body);

      if (res.status == 200) {
        window.FlashMessage.success('Mastery Check Added');
        $('#add-mastery-modal').modal('hide');
        render_mastery_modal();
      } else {
        window.FlashMessage.error('Could not add new masterycheck, try again later');
      }
    });
  } else {
    window.FlashMessage.error('Please fill all the fields!');
  }
}

/**
 * Add listeners to all the buttons to add new questions to show the form for a new question
 * @listens click
 */
function show_question_form() {
  document.querySelectorAll('#a_add_question').forEach((link) => {
    console.log('one link');
    link.addEventListener('click', (e) => {
      e.preventDefault();

      let element = link;
      let cls = 'topic_list';
      // go up the html tree to find the topic section, which will contain the form to create a new question
      while ((element = element.parentElement) && !element.classList.contains(cls));

      element.innerHTML = ejs.views_manager_classrooms_new_question();
      init_question();
      topic_id = link.dataset.topic_id;
      console.log(topic_id);
    });
  });
}

let API_mastery = (function () {

  /**
   * Add a new mastery check to the db
   * @param {Object} body the body of the request with the content to send to the server
   * @returns {Promise} the promise with the response
   */
  function post_mastery(body) {
    return fetch(`/masterycheck?classroom_id=${classroom_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  /**
   * Get all the mastery checks for the specific classroom.
   */
  function get_masteries() {
    return fetch(`/masterycheck?classroom_id=${classroom_id}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        return result;
      });
  }

  /**
   * Edit the content of a masterycheck
   * @param {Object} body the body of the request with the content to send to the server
   * @returns {Promise} the promise with the response
   */
  function edit_mastery(body) {
    return fetch(`/masterycheck?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  /**
   * Add a new topic to the db
   * @param {Object} body the body of the request with the content to send to the server
   * @returns {Promise} the promise with the response
   */
  function add_topic(body) {
    return fetch(`/topic?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  /**
   * Edit the content of a topic
   * @param {Object} body the body of the request with the content to send to the server
   * @returns {Promise} the promise with the response
   */
  function edit_topic(body) {
    return fetch(`/topic?classroom_id=${classroom_id}&topic_id=${topic_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  return {
    post_mastery,
    get_masteries,
    edit_mastery,
    edit_topic,
    add_topic,
  };
})();
