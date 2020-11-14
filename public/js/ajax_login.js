// Login page alert handler for the validation link

let alert = document.getElementById("unconfirmed_alert");

if (alert) {
  document.getElementById("modal_btn").classList.remove("d-none");
  document.getElementById("modal_form").addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.getElementById("modal_email").value;
    fetch("/user/verify/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    });
    document.getElementById("modal_close").click();
    document.getElementById("modal_btn").style.display = "none";
    // Todo: add info warning
  });
}
