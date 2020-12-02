const classroom_id = new URLSearchParams(window.location.search).get("classroom_id");

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


function render_mastery_modal() {
  API_mastery.get_masteries().then(res => {
    document.getElementById("mastery-modal-body").innerHTML = ejs.views_manager_mastery_mastery_list({ result: res })
    add_delete_event();
  });
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
        window.FlashMessage.success("New mastery added!");
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

  return {
    post_mastery,
    get_masteries
  };
})();
