var number_of_fields = 1;
const max_fields = 6;
// TODO: stack of inputs elements to allow to remove fields
// TODO: allow only a certain umber of fields
var input_elements = [];
var code_div;
var text_div;
var editor;
var code_or_text = "text";
var lang = "text";

//const classroom_id = new URLSearchParams(window.location.search).get("classroom_id");
//const topic_id = new URLSearchParams(window.location.search).get("topic_id");

/**
 * Initializes the view with the editor and event listeners.
 */
function init_question() {
    console.log("initttt");
    number_of_fields = 1;
    handle_dynamic_fields();
    handle_remove_field();
    handle_code();
    lang = code_or_text == "text" ? "text" : lang;
}

function reset_values() {
    number_of_fields = 1;
    input_elements = [];
    document.getElementById("input_counter").value = 1;
    lang = "text";
    code_or_text = "text";
}

/**
 * Adds a new inut field for a new option when the button is clicked.
 * @listens click
 */
function handle_dynamic_fields() {
    document.getElementById('new_field').addEventListener("click", (e) => {

        if (number_of_fields >= max_fields) {
            document.getElementById("fields_label").innerHTML = "Maximal number of options";
            return;
        }
        document.getElementById("fields_label").innerHTML = "Options: " + (number_of_fields + 1);
        document.getElementById("delete_field").style.visibility = "visible";

        console.log("new field request")
        var input_node = document.createElement("input");
        input_node.type = "text";
        input_node.id = number_of_fields;
        input_node.name = number_of_fields;
        input_node.placeholder = "Option " + (number_of_fields + 1);
        input_node.required = true;


        var checkbox_node = document.createElement("input");
        checkbox_node.type = "checkbox";
        checkbox_node.id = "check_" + number_of_fields
        checkbox_node.checked = true;

        number_of_fields++;

        var label_node = document.createElement("label");
        label_node.innerHTML = "Correct answer";
        label_node.for = number_of_fields; // not correct

        // Add the elements to the stack
        input_elements.push({ input_node, checkbox_node, label_node });

        document.querySelector('form')
            .appendChild(input_node);
        document.querySelector('form')
            .appendChild(checkbox_node);
        document.querySelector('form')
            .appendChild(label_node);

        document.getElementById("input_counter").value = number_of_fields;
    })
}

/**
 * Toggle between the code editor and the text area.
 */
function toggle_code_to_text() {
    let btn = document.getElementById("question_type");
    // this input tells if the question if of type text or code
    let hidden_input = document.getElementById("code_or_text");

    // switching from code -> text
    if (text_div.classList.contains("hidden")) {
        text_div.classList.remove("hidden");
        code_div.classList.add("hidden");
        btn.innerHTML = "Code question"
        hidden_input.value = "text";
        code_or_text = "text";
        lang = "text";
    }
    // switching from text -> code
    else {
        text_div.classList.add("hidden");
        code_div.classList.remove("hidden");
        btn.innerHTML = "Text question"
        hidden_input.value = "code";
        code_or_text = "code";
        lang = editor.getOption("mode");
    }
}

/**
 * Set up the default text editor, with default values, initially being empty
 */
function handle_code() {
    let edit_area = document.getElementById("code_area")

    editor = CodeMirror.fromTextArea(edit_area, {
        lineNumbers: true,
        mode: "javascript",
        theme: "dracula",
        tabSize: 4
    });
    code_div = document.getElementById("code_div");
    text_div = document.getElementById("text_div");
    code_div.classList.add("hidden");
    // when a new language is selected, call the function to set the new syntax highlight of CodeMirror
    document.getElementById("lang_select").onchange = change_language;
    lang = editor.getOption("mode");
}

/**
 * Get the value of the code editor
 * @returns the content of the code editor.
 */
function get_code() {
    return editor.getValue();
}

/**
 * Get the content of the textarea
 * @returns the content of the textarea
 */
function get_text() {
    return document.getElementById("text_area").value;
}

/**
 * Change the language of the code editor depending on the selected option
 */
function change_language() {
    let list = document.getElementById("lang_select");
    let selected_lang = list.options[list.selectedIndex].value;
    console.log(selected_lang);
    lang = selected_lang;
    editor.setOption("mode", selected_lang);
}

/**
 * Removes the last input field added, if there's more than one input.
 */
function remove_last_field() {
    let tos = input_elements.pop();
    // if there was still an element
    if (tos) {
        // tos is an object made by an input, a checkbox and a label
        // all three needs to be removed
        tos["input_node"].remove();
        tos["checkbox_node"].remove();
        tos["label_node"].remove();
        number_of_fields--;
        document.getElementById("input_counter").value = number_of_fields;
        document.getElementById("fields_label").innerHTML = "Options: " + number_of_fields;
    }
    // hide the button to delete fields if only one field is left 
    if (input_elements.length == 0) {
        document.getElementById("delete_field").style.visibility = "hidden";
    }
}

/**
 * Add a listeners for the button to add option fields
 * @listens click
 */
function handle_remove_field() {
    document.getElementById("delete_field").addEventListener("click", (e) => {
        remove_last_field();
    })
}

/**
 * Create the body containing the text and options for the new question
 * to be posted
 */
function post_question() {
    // get question text:
    let question_text = (code_or_text == "code") ? get_code() : get_text();
    if(question_text == "") {
        window.FlashMessage.error("Please fill the question field.");
        return;
    }
    console.log("posted");
    let n_inputs = document.getElementById("input_counter").value;
    let curr;
    let curr_checkbox;
    let options = [];
    // populate the array of options:
    for (let i = 0; i < n_inputs; ++i) {
        curr = document.getElementById(`${i}`);
        curr_checkbox = document.getElementById("check_" + i);
        // the array will contain tuples of the kind: ["option text", "true/false"]
        options.push([curr.value, curr_checkbox.checked]);
    }
    

    let body = JSON.stringify({
        answer: options,
        topic: topic_id,
        text: question_text,
        lang: lang
    });
    

    API_question.post_question(body).then(res => { return res.json() }).then(new_question => {
        console.log(new_question);
        window.FlashMessage.success("New Question added!");

        reset_values()
        render_mastery_modal();
    })
        .catch(err => {
            console.log(err);
            window.FlashMessage.error("Could not add question, try again later.");
        })
}

API_question = (function () {

    /**
     * Post the given new question
     * @param {Object} body The body of the question
     */
    function post_question(body) {
        return fetch(`/question/new?topic_id=${topic_id}&classroom_id=${classroom_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
    }

    return {
        post_question
    }

})()