// TODO: FIX THIS 420  8 8
//                     ||
//                     V

let form_state = 0;

function toggle_form() {
    if (!form_state) {
        document.getElementById("btn_profile").innerHTML = "Hide Editor"
        document.getElementById("update_form").innerHTML = ejs.views_profile_update_form();

        console.log(document.getElementsByTagName("FORM"));
        document.getElementsByTagName("FORM").foreach((e) => {
            e.addEventListener("submit", (event) => {
                event.preventDefault();
                update_user();
            });
        });
        form_state = 1;
    } else {
        document.getElementById("btn_profile").innerHTML = "Show Editor"
        document.getElementById("update_form").innerHTML = "";
        form_state = 0;
    }
}

function update_user() {
    // fetch("/user/update", {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //         name: document.getElementById("input_name").value,
    //         surname: document.getElementById("input_surname").value,
    //         password: document.getElementById("input_password").value,
    //     }),
    // }).then(() => {
    //     empty_field();
    //     print_list();
    // });
}