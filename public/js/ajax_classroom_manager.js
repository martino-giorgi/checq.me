var c_id = undefined;
var selected_user = undefined;

//CLASSROOM MANAGER -- SECTION: Mastery Checks
function init_manager() {
  let url = new URL(window.location.href)
  c_id = url.searchParams.get('classroom_id')

  API.get_class_info(c_id).then(res => {
    console.log(res);
    API.class_obj = res[0];
    display_class_info();
  })
  .catch(err => {
    console.log(err);
  })
}

/**
 * Display the classroom information
 * @param {Object} classroom the classroom object
 */
function display_class_info() {
  document.getElementById("class_info").innerHTML = ejs.views_manager_partial_class_info(API.class_obj);
}

/**
 * Render the view of the modal for the user list
 */
function render_user_modal() {
  document.getElementById("user-modal-body").innerHTML = ejs.views_manager_partial_class_student_list(API.class_obj);
}

function render_add_mastery_modal() {
  document.getElementById("add-mastery-modal-body").innerHTML = ejs.views_manager_mastery_mastery_add({ current: {} });
}

/**
 * Set the value of the id of the selected user when clicking on the actions on the user list modal
 * @param {Number} user_id the id of the selected participant
 */
function setUser(user_id) {
  selected_user = user_id;
  document.getElementById("toggleTA_btn")
    .innerHTML = API.class_obj.teaching_assistants.map(e => e._id).includes(user_id)
      ? "Remove as TA" : "Add as TA";

  document.getElementById("toggleProf_btn")
    .innerHTML = API.class_obj.professors.map(e => e._id).includes(user_id)
      ? "Remove Professor" : "Make Professor";
}


/**
 * Get the id of the selected user from the user list modal
 * @returns {Number} the id of the selected user
 */
function getUser() {
  return selected_user;
}

/**
 * Make the user with the given id a TA if it's a student, or make it a student if it is a TA.
 * If it's a student, change the role from 2 to 1, move it from the list of participants to the list of teaching assistants
 * and finally add this classroom in the list of the classrooms for which the user is a TA.
 * If it's a TA, change the role from 1 to 2 only if it is not TA for another class and move it from the list of teaching assistants
 * to the list of participants. Finally remove the class from the list of the classrooms for which the user is a TA.
 * @param {ObjectID} user_id The id of the user to be made TA or made back to student
 */
function toggleTA(user_id) {
  let body = {
    classroom_id: c_id,
    user_id
  }

  if (API.class_obj.teaching_assistants.map(e => e._id).includes(user_id)) {
    API.removeTa(JSON.stringify(body)).then((() => {
      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();
      });
    })
    );
  } else {
    API.makeTa(JSON.stringify(body)).then(res => {
      console.log(res.status);
      if (res.status == 400) {
        window.FlashMessage.error("Lecturer role can't be changed");
      }

      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();

      })
    })
  }

}

/**
 * If the User is a student, make it a Professor. The user must already have the role 0 ( being signed in as a professor ).
 * If the user is a professor for this class, make it a student for this class.
 * @param {ObjectID} user_id the ID corresponding to the selected user.
 */
function toggleProf(user_id) {
  let body = {
    professor_id: user_id
  }
  // if is a professor, remove
  if (API.class_obj.professors.map(e => e._id).includes(user_id)) {
    API.removeProf(JSON.stringify(body)).then(res => {
      if (res.status == 400) {
        window.FlashMessage.error("Owner can't be changed");
      }
      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();

      })
    })
  }
  else {
    API.makeProf(JSON.stringify(body)).then( res => {
      if (res.status == 400) {
        window.FlashMessage.error("User's account doesn't have Professors rights");
      }
      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();

      })
    })
  }
}

/**
 * Try to remove a participant from the classroom. The owner of the classroom can not be removed.
 * Only students can be directly removed. To remove TAs and Professors ( non-owner ) one must first change their role
 * to student.
 * On failure a flash is shown on the client, stating the error.
 * @param {ObjectID} user_id the selected user.
 */
function removeFromClass(user_id) {
  let body = {
    student_id: user_id
  }
  if (API.class_obj.partecipants.map(e => e._id).includes(user_id) && API.class_obj.lecturer != user_id) {
    API.removeFromClass(JSON.stringify(body)).then(() => {
      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();

      })
    })
  } else {
    if (API.class_obj.lecturer._id == selected_user) {
      window.FlashMessage.error("Can not remove owner!");
    }
    else {
      window.FlashMessage.error("Can only remove students, change role of this user!");
    }
  }
}


/**
 * Toggle between showing and hiding the topic form
 */
function toggle_show_topic_form() {
  let model = {
    id: API.class_obj._id,
    masterychecks: API.class_obj.mastery_checks
  }
  document.getElementById("topic_form").innerHTML = ejs.views_manager_classrooms_new_topic(model)
}


API = (function () {
  let class_obj = undefined;

  /**
   * Get the classroom object corresponding to the given id
   * @param {Number} id the id of the classroom 
   * @returns {Promise} the promise that will give the classroom object
   */
  function get_class_info(id) {
    return fetch("/classroom/class?classroom_id=" + id, {
      headers: { 'Content-Type': 'application/json', 'Accept' : 'application/json' },
    }).then(res => {
      return res.json();
    })

  }

  function add_topic(body) {
    return fetch("/topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }

  /**
   * Ask the server to make the user a TA for this classroom.
   * @param {Object} body the body containing the ID of the user.
   * @returns {Promise} the promise with the status code of the request.
   */
  function makeTa(body) {
    return fetch("/classroom/ta?classroom_id=" + c_id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  /**
   * Ask the server to remove the role of TA for this classroom.
   * @param {Object} body the body containing the ID of the user.
   * @returns {Promise} the promise with the status code of the request
   */
  function removeTa(body) {
    return fetch("/classroom/ta?classroom_id=" + c_id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  /**
   * Ask the server to make the user a Professor for this classroom.
   * @param {Object} body the body containing the ID of the user.
   * @returns {Promise} the promise with the status code of the request
   */
  function makeProf(body) {
    return fetch("/classroom/professor?classroom_id=" + c_id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  /**
   * Ask the server to remove the professor role of the user for this classroom.
   * @param {Object} body the body containing the ID of the user.
   * @returns {Promise} the promise with the status code of the request
   */
  function removeProf(body) {
    return fetch("/classroom/professor?classroom_id=" + c_id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  /**
   * Ask the server to remove the user from the classroom.
   * @param {Object} body the body containing the ID of the user.
   * @returns {Promise} the promise with the status code of the request
   */
  function removeFromClass(body) {
    return fetch("/classroom/student?classroom_id=" + c_id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  function show_topic(topic_id) {
    fetch(`/topic/${topic_id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        document.getElementById(
          "classrooms_container"
        ).innerHTML = ejs.views_manager_classrooms_topic(res);
        // TODO: use the function from ajax_topic API
        handle_dynamic_fields();
        handle_remove_field();
      });
  }

  return {
    makeTa,
    removeTa,
    class_obj,
    show_topic,
    removeProf,
    makeProf,
    removeFromClass,
    get_class_info
  };
})();
