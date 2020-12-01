var c_id = undefined;
var selected_user = undefined;

//CLASSROOM MANAGER -- SECTION: Mastery Checks
function init_manager() {
  init_mastery();
  let url = new URL(window.location.href)
  c_id = url.searchParams.get('classroom_id')

  API.get_class_info(c_id).then(res => {
    API.class_obj = res[0];
    display_class_info();

  })
}

/**
 * Display the classroom informations
 * @param {Object} classroom the classroom object
 */
function display_class_info() {
  document.getElementById("class_info").innerHTML = ejs.views_manager_partial_class_info(API.class_obj);
}

function render_user_modal() {
  document.getElementById("user-modal-body").innerHTML = ejs.views_manager_partial_class_student_list(API.class_obj);
}

// function render_mastery_modal() {
//   document.getElementById("mastery-modal-body").innerHTML = 
// } mikiskate 

function setUser(user_id) {
  selected_user = user_id;
  document.getElementById("toggleTA_btn")
    .innerHTML = API.class_obj.teaching_assistants.map(e => e._id).includes(user_id)
      ? "Remove as TA" : "Add as TA";
}

function getUser() {
  return selected_user;
}

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
    API.makeTa(JSON.stringify(body)).then(updated_classroom => {
      API.class_obj = updated_classroom;

      API.get_class_info(c_id).then(res => {
        API.class_obj = res[0];
        render_user_modal();
        display_class_info();

      })
    })
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


function set_navbar_active(element_id) {
  let navbar = document.getElementById("sub_navbar").querySelectorAll("a");
  navbar.forEach(element => {
    element.classList.remove("active")
  });
  document.getElementById(element_id).classList.add("active");
}

//CLASSROOM MANAGER -- SECTION: TAs
function init_tas() {
  let url = new URL(window.location.href);
  c_id = url.searchParams.get('id');
  document.getElementById("sub_navbar").innerHTML = ejs.views_manager_partial_class_navbar({ c_id });
  set_navbar_active("a_nav_tas");
}


API = (function () {
  let class_obj = undefined;

  /**
   * Get the classroom object corresponding to the given id
   * @param {Number} id the id of the classroom 
   * @returns {Promise} the promise that will give the classroom object
   */
  function get_class_info(id) {
    return fetch("/classroom/class?classroom_id=" + id).then(res => {
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

  function makeTa(body) {
    return fetch("/classroom/ta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  function removeTa(body) {
    return fetch("/classroom/ta", {
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
    show_start_view,
    get_class_info
  };
})();
