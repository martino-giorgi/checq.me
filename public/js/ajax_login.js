// Login page alert handler for the validation link

let alert = document.getElementById("unconfirmed_alert");

if (alert) {
  document.getElementById("modal_btn").classList.remove("d-none");
  document.getElementById("modal_form").addEventListener("submit", (e) => {
    e.preventDefault();
    let form_body = new FormData(document.getElementById("modal_form"));

    fetch("/user/verify/resend", { method: "POST", body: form_body }).then(
      () => {
        document.getElementById("modal_close").click();
        document.getElementById("modal_btn").style.display = "none";
      }
    );
  });
}
