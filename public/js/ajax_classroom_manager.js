var c_id = undefined;

/**
 * Initialize the view by getting the right class and display it's informations
 */
function init() {
  init_mastery();
  let url = new URL(window.location.href)
  c_id = url.searchParams.get('id')

  API.get_class_info(c_id).then(res => {

    API.class_obj = res[0];
    console.log(API.class_obj)
    display_class_info(res);
  })
}

/**
 * Display the classroom informations
 * @param {Object} classroom the classroom object
 */
function display_class_info(classroom) {
  document.getElementById("class_info").innerHTML = ejs.views_manager_partial_class_info(classroom[0]);
}

/**
 * Toggle between showing and hiding the form used to add TA
 */
function toggle_show_ta_form() {
  let section = document.getElementById("ta_form");
  if (section.innerHTML == "") {

    section.innerHTML = ejs.views_manager_partial_class_add_ta(API.class_obj);
    document.getElementById("partecipants_list").onchange = show_new_selected
  }
  else {
    section.innerHTML = "";
  }
}

/**
 * Toggle between showing and hiding the form to add a professor
 */
function toggle_show_prof_form() {
  let section = document.getElementById("prof_form");
  if (section.innerHTML == "") {

    section.innerHTML = ejs.views_manager_partial_class_add_prof(API.class_obj);
    document.getElementById("partecipants_list").onchange = show_new_selected
  }
  else {
    section.innerHTML = "";
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


function show_new_selected() {
  let list = document.getElementById("partecipants_list");
  let form = document.getElementById("ta_form");
  var selected_name = list.options[list.selectedIndex].text;
  let role = list.options[list.selectedIndex].id;
  if (role == 2) {
    // bugged, keeps adding elements
    // let s1 = document.createElement("select");
    // form.appendChild(s1);
    // let o1 = document.createElement("option");
    //   o1.innerHTML = "TA";
    // s1.appendChild(o1)
    let str = `Are you sure you want <b>${selected_name} </b>to be TA?`
    document.getElementById("selected_user").innerHTML = str;

  }
}


API = (function () {
  let class_obj = undefined;

  /**
   * Get the classroom object corresponding to the given id
   * @param {Number} id the id of the classroom 
   * @returns {Promise} the promise that will give the classroom object
   */
  function get_class_info(id) {
    return fetch("/classroom/" + id).then(res => {
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


  // Reset initial html and show list of classes
  // this function is called when the view is replaced completely
  // for example when displaying a topic, we need to reset the view "classrooms" to have
  // the tags necessary for show_classes()
  function show_start_view() {

  }

  return {
    class_obj,
    show_topic,
    show_start_view,
    get_class_info
  };
})();
