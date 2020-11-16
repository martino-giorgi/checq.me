
function init() {
    // display the list of classes
    API.show_classes();

    // show and handle events when the form for the new class is requested
    document.getElementById('new_class_button').addEventListener("click", (e) => {
        API.show_newclass_form();
        API.handle_newclass_form();
    });


}

API = function () {

    // returns a promise that will give all the classrooms of the professor
    function get_classes() {
        return fetch("/classroom").then(res => {
            return res.json();
        })
    }

    function show_classes() {
        get_classes().then(classes => {
            document.getElementById("classes").innerHTML = ejs.views_manager_classrooms_classrooms_list({ collection: classes })

            let buttons = document.getElementsByClassName("new_topic_button");
            for (let i = 0; i < buttons.length; i++) {
                let btn = buttons[i];
                btn.addEventListener("click", (e) => {
                    let id = btn.value
                    
                    let topic_form_section = document.getElementById("new_topic_form_section")
                    topic_form_section.innerHTML = ejs.views_manager_classrooms_new_topic({ id });
                    document.getElementById("new_topic_form").addEventListener("submit", (e) => {
                        e.preventDefault();
                        fetch("/topic", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: document.getElementById("topic_name").value,
                                description: document.getElementById("topic_description").value,
                                classroom: document.getElementById("classroom_id").value
                            })
                        })
                        .then( res => {
                            return res.text();
                        })
                        .then( res => {
                            show_classes();
                            topic_form_section.innerHTML = "";
                        })
                    })
                })
            }

        });

    }

    // display in the form section the form to add a new class
    function show_newclass_form() {
        document.getElementById('new_class_form_section').innerHTML = ejs.views_manager_classrooms_add_classroom({});
    }

    // function show_topic(topic_id) {
    //     document.getElementById('classrooms_container').innerHTML = ejs.views.manager_classrooms_topic({})
    // }

    // send values from the form used to create new classes
    // and handle view ( reload class list and clear form )
    function handle_newclass_form() {
        let form = document.getElementById("new_class_form");
        let section = document.getElementById("new_class_form_section");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            fetch("/classroom/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: document.getElementById("input_name").value,
                    description: document.getElementById("input_desc").value
                })
            }).then(res => {
                section.innerHTML = "";
                return res.text();
            })
                .then(res => {
                    show_classes();
                })

        })
    }

    return {
        show_newclass_form,
        handle_newclass_form,
        show_classes
        // show_topic
    }
}()