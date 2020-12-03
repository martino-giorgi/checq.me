const classroom_id = new URLSearchParams(window.location.search).get("classroom_id");

function init_mastery() {
  print_list();
  add_delete_event();
}

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
        print_list();
      });
    })
  });
}

function print_list() {
  let classroom_id = new URLSearchParams(window.location.search).get("classroom_id");
  fetch(`/masterycheck?classroom_id=${classroom_id}`)
    .then((res) => {
      return res.json();
    })
    .then((list) => {
      if (list.length > 0) {
        document.getElementById("list").innerHTML = ejs.views_manager_mastery_mastery_list({
          result: list,
        });
        add_delete_event();
      } else {
        document.getElementById("list").innerHTML = "";
      }
    });
}

function empty_field() {
  document.getElementById("input_name").value = "";
  document.getElementById("input_description").value = "";
  document.getElementById("check_available").checked = false;
}

function add() {
  let dom = document.getElementById("add");
  let btn = document.getElementById("add_btn");
  fetch("/classroom")
    .then((res) => {
      return res.json();
    })
    .then((classroom_list) => {
      dom.innerHTML = ejs.views_manager_mastery_mastery_add({ classroom_list });
      btn.style.display = "none";
      // Client side POST for creating Mastery Check
      let form = document.getElementById("create_form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(`/masterycheck?classroom_id?${classroom_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: document.getElementById("input_name").value,
            description: document.getElementById("input_description").value,
            available: document.getElementById("check_available").checked,
            classroom: classroom_id
          }),
        }).then(() => {
          empty_field();
          print_list();
        });
      });
    });
}
