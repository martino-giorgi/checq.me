function init_manager() {
  // Client side POST for creating Mastery Check
  let form = document.getElementById("create_form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/manager", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("input_name").value,
        description: document.getElementById("input_description").value,
        available: document.getElementById("check_available").value,
        mandatory: document.getElementById("check_mandatory").value,
      }),
    });
  });
}
