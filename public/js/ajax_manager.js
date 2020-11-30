/**
 * Initialize the page by displaying the list of classrooms
 * and adding event listeners to the buttons
 */
function init() {
    API.get_classrooms().then((response) => {
        document.getElementById(
            "classroom_list"
        ).innerHTML = ejs.views_manager_partial_class_list({
            classrooms: response.classrooms,
        });
        // store the current user
        API.user = response["user"];
        document.getElementById(
            "form"
        ).innerHTML = ejs.views_manager_partial_class_add_form({ user: API.user });

        document
            .getElementById("new_class_form")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                submit_form();
                toggle_show_form();
                window.FlashMessage.success("Class added!");
            });
    });
}

/**
 * Toggle between showing and hiding the form to add a new class
 */
function toggle_show_form() {
    let form = document.getElementById("form");
    let classroom_list = document.getElementById("classroom_list");
    let button = document.getElementById("show_or_back");

    if (form.classList.contains("hidden")) {
        classroom_list.classList.add("hidden");
        form.classList.remove("hidden");
        button.innerHTML = "Back to list";
    } else {
        form.classList.add("hidden");
        classroom_list.classList.remove("hidden");
        button.innerHTML = "Add Class";
    }
}

/**
 * Submit the values for the new class from the form
 */
function submit_form() {
    let body = JSON.stringify({
        name: document.getElementById("input_name").value,
        description: document.getElementById("input_desc").value,
        is_ordered: document.getElementById("input_is_ordered").checked,
    });

    API.post_classroom(body).then((new_classroom) => {
        document.getElementById(
            "classroom_list"
        ).innerHTML += ejs.views_manager_partial_class_list({
            classrooms: [new_classroom],
        });
        document.getElementById("classroom_list").classList.remove("hidden");
        document.getElementById("form").classList.add("hidden");
    });
}

/**
 * Generate an invite link to join a class and when available
 * copy it to the clipboard
 * @param {ObjectId} id the id of the classroom
 */
function generate_invite_link(id) {
    console.log(id);
    let textarea = document.createElement("textarea");
    textarea.style = { position: "absolute", left: "-9999px" };
    document.body.appendChild(textarea);
    textarea.setAttribute("readonly", "");

    API.get_invite_link(id)
        .then((link) => {
            console.log(link);
            textarea.value = link;
            textarea.select();
            try {
                document.execCommand("copy");
                window.FlashMessage.success("Invite link copied to clipboard");
            } catch (err) {
                window.FlashMessage.faliure("Oops, unable to copy");
            }
            document.body.removeChild(textarea);
        })
        .catch((err) => {
            console.log(err);
            window.FlashMessage.faliure("Error generating link");
            document.body.removeChild(textarea);
        });
}

let API = function () {
    // The current user will be defined in the function init()
    // when loading the class list for the first time
    let user = undefined;

    /**
     * Add a new classroom to the DB.
     * @param {Object} content the body with the info for the new classroom
     * @returns {Promise} the promise that will contain the new class.
     */
    function post_classroom(content) {
        return fetch("/classroom/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: content,
        }).then((res) => {
            return res.json();
        });
    }

    /**
     * Get the classrooms where the user is a lecturer.
     * @returns {Promise} the promise that will contain the list of classrooms
     */
    function get_classrooms() {
        return fetch("/classroom").then((res) => {
            return res.json();
        });
    }

    /**
     * Get an invitation link for the class specified by the id.
     * @param {ObjectId} id the id of the classroom. 
     * @returns {Promise} the promise that will contain the invite link
     */
    function get_invite_link(id) {
        return fetch("/classroom/invite/" + id).then((res) => {
            return res.json();
        });
    }

    /**
     * Get the classroom specified by the id.
     * @param {ObjectId} id the id of the classroom. 
     * @returns {Promise} the promise that will contain the classroom
     */
    function get_class(id) {
        return fetch("/classroom/" + id).then((res) => {
            return res.json();
        });
    }

    return {
        post_classroom,
        get_classrooms,
        get_invite_link,
        get_class,
        user
    }
}();
