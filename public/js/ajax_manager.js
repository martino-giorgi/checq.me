const elem = document.getElementById('picker');
const start = document.getElementById('start');
const end = document.getElementById('end');

let datepicker = new DateRangePicker(elem, {
    buttonClass: 'btn',
    format: 'dd/mm/yyyy'
}); 

/**
 * Toggle between showing and hiding the form to add a new class
 */
function toggle_show_form() {
    let table = document.getElementById("classroom-table");
    let no_classroom = document.getElementById("no-classrooms");

    let form = document.getElementById("form");
    let btn1 = document.getElementById("show_or_back");
    let btn2 = document.getElementById("show_or_back_1");
    
    if (form.classList.contains("hidden") ) {
        if (document.body.contains(table)) {
            table.classList.add("hidden");
        } else {
            no_classroom.hidden = true;
        }

        form.classList.remove("hidden");
        btn1.classList.add("hidden");
        btn2.classList.remove("hidden");
    } else {
        if (document.body.contains(table)) {
            table.classList.remove("hidden");
        } else {
            no_classroom.hidden = false;
        }
        form.classList.add("hidden");
        btn1.classList.remove("hidden");
        btn2.classList.add("hidden");

        document.querySelectorAll("input:not(#submit-btn), textarea").forEach((el) => {
            el.value = "";
        })

        datepicker.datepickers.forEach((picker) => {
            picker.setDate({ clear: true })
        })
    }
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
                window.FlashMessage.error("Oops, unable to copy");
            }
            document.body.removeChild(textarea);
        })
        .catch((err) => {
            console.log(err);
            window.FlashMessage.error("Error generating link");
            document.body.removeChild(textarea);
        });
}

let API = function () {
    /**
     * Get an invitation link for the class specified by the id.
     * @param {ObjectId} id the id of the classroom. 
     * @returns {Promise} the promise that will contain the invite link
     */
    function get_invite_link(id) {
        return fetch(`/classroom/invite?classroom_id=${id}`).then((res) => {
            return res.json();
        });
    }

    return {
        get_invite_link,
    }
}();
