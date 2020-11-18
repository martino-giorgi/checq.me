function init() {
  // display the list of classes
  API.show_classes();

  // show and handle events when the form for the new class is requested
  document.getElementById("new_class_button").addEventListener("click", (e) => {
    API.show_newclass_form();
    API.handle_newclass_form();
  });
}

function show_classes() {
  API.get_classes().then((classes) => {
    console.log(classes);
    document.getElementById(
      "classes"
    ).innerHTML = ejs.views_manager_classrooms_classrooms_list({
      collection: classes,
    });

    let buttons = document.getElementsByClassName("new_topic_button");
    // Handle each button to add topics
    for (let i = 0; i < buttons.length; i++) {
      let btn = buttons[i];
      btn.addEventListener("click", (e) => {
        let id = btn.value;

        let topic_form_section = document.getElementById("new_topic_form_section");
        topic_form_section.innerHTML = ejs.views_manager_classrooms_new_topic({ id, });
        document
          .getElementById("new_topic_form")
          .addEventListener("submit", (e) => {
            e.preventDefault();

            // fetch("/topic", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         name: document.getElementById("topic_name").value,
            //         description: document.getElementById("topic_description").value,
            //         classroom: document.getElementById("classroom_id").value
            //     })
            // })
            // .then( res => {
            //     return res.text();
            // })
            // .then( res => {
            //     show_classes();
            //     topic_form_section.innerHTML = "";
            // })
          });
      });
    }

    // handle each button to view the topic
    let view_topic_buttons = document.getElementsByClassName(
      "view_topic_button"
    );
    for (let j = 0; j < view_topic_buttons.length; ++j) {
      console.log(view_topic_buttons[j].value);
      let btn = view_topic_buttons[j];
      btn.addEventListener("click", (e) => {
        show_topic(btn.value);
      });
    }
  });
}

API = function () {
  // returns a promise that will give all the classrooms of the professor
  function get_classes() {
    return fetch("/classroom").then((res) => {
      return res.json();
    });
  }

  function add_topic(body) {
    return fetch("/topic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  }

  // display in the form section the form to add a new class
  function show_newclass_form() {
    document.getElementById(
      "new_class_form_section"
    ).innerHTML = ejs.views_manager_classrooms_add_classroom({});
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

  // send values from the form used to create new classes
  // and handle view ( reload class list and clear form )
  function handle_newclass_form() {
    let form = document.getElementById("new_class_form");
    let section = document.getElementById("new_class_form_section");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      fetch("/classroom/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("input_name").value,
          description: document.getElementById("input_desc").value,
        }),
      })
        .then((res) => {
          section.innerHTML = "";
          return res.text();
        })
        .then((res) => {
          show_classes();
        });
    });
  }

  // Reset initial html and show list of classes
  // this function is called when the view is replaced completely
  // for example when displaying a topic, we need to reset the view "classrooms" to have
  // the tags necessary for show_classes()
  function show_start_view() {
    document.body.innerHTML = ejs.views_manager_classrooms_classrooms();
    show_classes();
  }

  return {
    get_classes,
    show_newclass_form,
    handle_newclass_form,
    show_classes,
    show_topic,
    show_start_view,
  };
}();



