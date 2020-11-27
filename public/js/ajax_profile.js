function display(clicked) {
    document.querySelectorAll(".secondary-nav > a > div").forEach((element) => {
        element.classList.remove("active");
    });

    document.querySelector(`#${clicked}-button > div`).classList.add("active");

    document.querySelectorAll(".wrapper > .content > div:not(.secondary-nav)").forEach((element) => {
        element.hidden = true;
    })

    document.querySelector(`.wrapper > .content > div#${clicked}`).hidden = false;
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