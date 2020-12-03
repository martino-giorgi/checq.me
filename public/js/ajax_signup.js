function init_signup() {
    console.log("yesss");
    init_uni_guesser();
}

/**
 * When a user is done typing the email, try looking for a university linked to the given email.
 * @listens "focusout"
 */
function init_uni_guesser() {
    let email_field = document.getElementById("email");

    email_field.addEventListener("focusout", e => {
        let domain = email_field.value.split('@')[1];
        if(domain) {
            API_signup.try_get_university(email_field.value.split('@')[1]).then( uni => {
                let section = document.getElementById("guessed_uni");
                if(uni && uni[0]) {
                    section.innerHTML = "Seems like you are from " + uni[0].name;
                    let checkbox = document.createElement("input");
                    checkbox.checked = true;
                    checkbox.type = "checkbox";
                    let label = document.createElement("label");
                    label.innerHTML = "Confirm?"
                    section.appendChild(document.createElement("br"));
                    section.appendChild(checkbox);
                    section.appendChild(label);
                } else {
                    section.innerHTML = `Could not find any University linked to that email.
                                         It is still possible to signup with a personal email,
                                         but we suggest using your University one.`
                }
            }).catch(err => {
                console.log(err);
            })
        }
    });
}

let API_signup = (function () {

    /**
     * Given a domain taken from an email, search for a university that has that domain
     * @param {String} domain the domain
     * @returns {Promise} the promise that will give the result of the search
     */
    function try_get_university(domain) {
        return fetch(`http://universities.hipolabs.com/search?domain=${domain}`).then( res => {
            return res.json();
        })
    }

    return {
        try_get_university
    }
})();