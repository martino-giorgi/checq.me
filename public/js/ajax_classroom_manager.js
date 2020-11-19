function init() {
  let url = new URL(window.location.href)
  let c_id = url.searchParams.get('id')
  
  API.get_class_info(c_id).then( res => {
    console.log(res);
    display_class_info(res);
  })
}

function display_class_info(classroom) {
  console.log(classroom[0])
  document.getElementById("class_info").innerHTML = ejs.views_manager_partial_class_info(classroom[0]);
}


API = (function () {
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

    show_topic,
    show_start_view,
    get_class_info
  };
})();



