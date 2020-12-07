const classroom_id = new URLSearchParams(window.location.search).get("classroom_id");
var mastery_id = undefined;
var topic_id = undefined;

function add_delete_event() {
  document.querySelectorAll(".delete_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let mastery_id = btn.parentNode.parentNode.querySelector("#id_container").dataset
        .id;
      let classroom_id = new URLSearchParams(window.location.search).get("classroom_id");

      fetch(`/masterycheck?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        render_mastery_modal();
      });
    })
  });
}

function add_edit_event() {
  document.querySelectorAll(".edit_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      mastery_id = btn.parentNode.parentNode.querySelector("#id_container").dataset
        .id;
      let card_body = btn.parentNode.parentNode.querySelector(".card-body");
      let current_values = {
        name: card_body.querySelector('h5').innerHTML,
        description: card_body.querySelector('#element_desc').innerHTML,
        available: card_body.querySelector('#element_available') == "Available" ? true : false
      }
      card_body.innerHTML = ejs.views_manager_mastery_mastery_add({ current: current_values });
    })
  });
}

function add_new_event() {
  document.querySelectorAll(".new_topic_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      mastery_id = btn.parentNode.parentNode.querySelector("#id_container").dataset
        .id;
      let card_body = btn.parentNode.parentNode.querySelector(".card-body");
      card_body.innerHTML = ejs.views_manager_classrooms_new_topic({ current: {} });
    })
  });
}

function add_edit_topic_event() {
  document.querySelectorAll(".edit_topic_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      mastery_id = btn.dataset.mastery_id;
      topic_id = btn.dataset.id;

      let card_body = btn.parentNode.parentNode.parentNode
      let current_values = {
        name: btn.dataset.name,
        description: btn.dataset.description,
      }
      card_body.innerHTML = ejs.views_manager_classrooms_new_topic({ current: current_values });
    })
  });
}



function render_mastery_modal() {
  API_mastery.get_masteries().then(res => {
    document.getElementById("mastery-modal-body").innerHTML = ejs.views_manager_mastery_mastery_list({ result: res })
    add_delete_event();
    add_edit_event();
    add_new_event();
    add_edit_topic_event();
    show_question_form();
  });
}

function create_topic() {
  let body = {
    name: document.getElementById("input_name").value,
    description: document.getElementById("input_description").value,
  }

  if (body.name != "" && body.description != "") {

    API_mastery.add_topic(JSON.stringify(body)).then(res => {
      if (res.status == 200) {
        window.FlashMessage.success("Topic Added");
        render_mastery_modal();
      }
      else {
        window.FlashMessage.error("Could not add new topic, try again later");
      }
    })
  } else {
    window.FlashMessage.error("Please fill all the fields!");
  }
}

function edit_topic() {
  let body = {
    name: document.getElementById("input_name").value,
    description: document.getElementById("input_description").value,
  }

  if (body.name != "" && body.description != "") {

    API_mastery.edit_topic(JSON.stringify(body)).then(res => {
      if (res.status == 200) {
        window.FlashMessage.success("Topic Edited");
        render_mastery_modal()
      }
      else {
        window.FlashMessage.error("Could not edit the topic, try again later");
      }
    })
  } else {
    window.FlashMessage.error("Please fill in all the fields!");
  }
}

function edit_mastery() {
  let body = {
    name: document.getElementById("input_name").value,
    description: document.getElementById("input_description").value,
    available: document.getElementById("check_available").checked
  }

  if (body.name != "" && body.description != "") {

    API_mastery.edit_mastery(JSON.stringify(body)).then(res => {
      if (res.status == 200) {
        window.FlashMessage.success("Mastery Check Edited");
        render_mastery_modal()
      }
      else {
        window.FlashMessage.error("Could not edit mastery check, try again later");
      }
    })
  } else {
    window.FlashMessage.error("Please fill all the fields!");
  }
}

function create_mastery() {
  let body = {
    name: document.getElementById("input_name").value,
    description: document.getElementById("input_description").value,
    available: document.getElementById("check_available") == "checked" ? true : false
  }

  if (body.name != "" && body.description != "") {

    API_mastery.post_mastery(JSON.stringify(body)).then(res => {
      if (res.status == 200) {
        window.FlashMessage.success("Mastery Check Added");
        $("#add-mastery-modal").modal('hide');
      }
      else {
        window.FlashMessage.error("Could not add new masterycheck, try again later");
      }
    })
  } else {
    window.FlashMessage.error("Please fill all the fields!");
  }
}

function show_question_form() {
  
  document.querySelectorAll("#a_add_question").forEach( link => {
    console.log("one link");
    link.addEventListener("click", e => {
      e.preventDefault();

      let element = link;
      let cls = "topic_list";
      // go up the html tree to find the topic section, which will contain the form to create a new question
      while ((element = element.parentElement) && !element.classList.contains(cls));
      

      element.innerHTML = ejs.views_manager_classrooms_new_question();
      init_question();
      topic_id = link.dataset.topic_id;
      console.log(topic_id);
     
    })
  })
}

API_mastery = (function () {

  function post_mastery(body) {
    return fetch(`/masterycheck?classroom_id=${classroom_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  function get_masteries() {
    return fetch(`/masterycheck?classroom_id=${classroom_id}`).then(res => {
      return res.json();
    }).then(result => { return result })
  }

  function edit_mastery(body) {
    return fetch(`/masterycheck?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body
    })
  }

  function add_topic(body) {
    return fetch(`/topic?classroom_id=${classroom_id}&mastery_id=${mastery_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    })
  }

  function edit_topic(body) {
    return fetch(`/topic?classroom_id=${classroom_id}&topic_id=${topic_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body
    })
  }

  return {
    post_mastery,
    get_masteries,
    edit_mastery,
    edit_topic,
    add_topic
  };
})();
