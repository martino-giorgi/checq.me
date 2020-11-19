var c_id = undefined;

//CLASSROOM MANAGER -- SECTION: Mastery Checks
function init_manager() {
  init_mastery();
  let url = new URL(window.location.href)
  c_id = url.searchParams.get('id')
  document.getElementById("sub_navbar").innerHTML = ejs.views_manager_partial_class_navbar({c_id});
  API.get_class_info(c_id).then( res => {
    
    API.class_obj = res[0];
    console.log(API.class_obj)
    display_class_info(res);
  })
}

function display_class_info(classroom) {
  console.log(classroom[0])
  document.getElementById("class_info").innerHTML = ejs.views_manager_partial_class_info(classroom[0]);
}

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

function show_new_selected() {
  let list = document.getElementById("partecipants_list");
  var selected_name = list.options[list.selectedIndex].text;
  // console.log(selected_name)
  // console.log("changed!")

  let str = `Are you sure you want <b>${selected_name} </b>to be your TA?`
  document.getElementById("selected_user").innerHTML = str;
}

//CLASSROOM MANAGER -- SECTION: Students
function init_students(){
  let url = new URL(window.location.href);
  c_id = url.searchParams.get('id');
  document.getElementById("sub_navbar").innerHTML = ejs.views_manager_partial_class_navbar({c_id});
  set_navbar_active("a_nav_students");
  API.get_class_info(c_id).then(classroom => {
    document.getElementById("student_list").innerHTML = ejs.views_manager_partial_students_list({partecipants:classroom[0].partecipants})
  })
}

function set_navbar_active(element_id){
  let navbar = document.getElementById("sub_navbar").querySelectorAll("a");
  navbar.forEach(element => {
    element.classList.remove("active")
  });
  document.getElementById(element_id).classList.add("active");
}

//CLASSROOM MANAGER -- SECTION: TAs
function init_tas(){
  let url = new URL(window.location.href);
  c_id = url.searchParams.get('id');
  document.getElementById("sub_navbar").innerHTML = ejs.views_manager_partial_class_navbar({c_id});
  set_navbar_active("a_nav_tas");
}


API = (function () {
  let class_obj = undefined;

  function get_class_info(id) {
    return fetch("/classroom/"+id).then( res => {
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



