function init() {
  print_list();
  // Client side DELETE
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
      });
      print_list();
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
        document.getElementById("list").innerHTML = ejs.views_mastery_list(
          list
        );
      }
    });
}

function add() {
  let dom = document.getElementById("add");
  let btn = document.getElementById("add_btn");
  dom.innerHTML = ejs.views_mastery_add();
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
        available: document.getElementById("check_available").value,
      }),
    });
    print_list();
  });
}
