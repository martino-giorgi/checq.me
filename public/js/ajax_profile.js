let form_state = 0;

function toggle_form() {
    if (!form_state) {
        document.getElementById("btn_profile").innerHTML = "Hide Editor"

        document.getElementById("update_form").innerHTML = ejs.views_profile_update_form();

        let forms = document.querySelectorAll("FORM");
        forms.forEach((e) => {
            e.addEventListener("submit", (event) => {
                event.preventDefault();
                update_user(event);
            });
        });
        form_state = 1;
    } else {
        document.getElementById("btn_profile").innerHTML = "Show Editor"
        document.getElementById("update_form").innerHTML = "";
        form_state = 0;
    }
}

function update_user(event) {
    if (event.target.id === "update_details") {
        // Update details
        fetch("/user/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById("input_name").value,
                surname: document.getElementById("input_surname").value,
            }),
        }).then((response) => {
            if (response.status == 200) {
                console.log("Details Updated");
                window.location.reload(false);
                // Todo: Add client side Flash
            }
        });
    } else {
        // Update password

        // Check if passwords match
        if (document.getElementById("input_newpassword").value === document.getElementById("input_confnewpassword").value) {
            fetch("/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: document.getElementById("input_newpassword").value,
                    conf_password: document.getElementById("input_confnewpassword").value
                }),
            }).then((response) => {
                if (response.status == 200) {
                    console.log("Password Updated");
                    window.location.reload(false);
                    // Todo: Add client side Flash
                }
            });
        } else {
            // Passwords do not match
            // Todo: Add Client side flash
        }
    }
}