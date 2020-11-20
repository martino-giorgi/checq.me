function init_mastery() {
  print_list();
  add_delete_event();
}

function add_delete_event() {
  document.querySelectorAll(".delete_btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let id = btn.parentNode.parentNode.querySelector("#id_container").dataset
        .id;
      fetch("/masterycheck", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
        }),
      }).then(() => {
        print_list();
      });
    });
  });
}

function print_list() {
  fetch("/masterycheck/list")
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
        fetch("/masterycheck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: document.getElementById("input_name").value,
            description: document.getElementById("input_description").value,
            available: document.getElementById("check_available").checked,
            classroom: c_id
          }),
        }).then(() => {
          empty_field();
          print_list();
        });
      });
    });
}
