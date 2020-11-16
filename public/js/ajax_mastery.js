function init() {
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
      window.location.reload(true);
    });
  });

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
    window.location.reload(true);
  });
}
