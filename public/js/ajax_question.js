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

function init_question() {
    handle_dynamic_fields();
    handle_remove_field();
    handle_code();
}
/*
    Appends a new input of type text to the form used to create multiple choice questions
    everytime the button to add a field is clicked
    The inputs have id=i and name=i for i in [0,1,2...]
*/

function handle_dynamic_fields() {
    document.getElementById('new_field').addEventListener( "click", (e) => {

        if(number_of_fields >= max_fields) {
            document.getElementById("fields_label").innerHTML = "Maximal number of options";
            return;
        }
        document.getElementById("fields_label").innerHTML = "Options: " + (number_of_fields+1);
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
        checkbox_node.id = "check_"+number_of_fields
        checkbox_node.checked = true;

        number_of_fields ++;
        
        var label_node = document.createElement("label");
        label_node.innerHTML = "Correct answer";
        label_node.for = number_of_fields; // not correct

        // Add the elements to the stack
        input_elements.push({input_node, checkbox_node, label_node});
        
        document.querySelector('form')
        .appendChild(input_node);
        document.querySelector('form')
        .appendChild(checkbox_node);
        document.querySelector('form')
        .appendChild(label_node);
        
        document.getElementById("input_counter").value = number_of_fields;
    })
}

// Toggle between showing the text area of the code area
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

// Set up the code area, initially being hidden
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

// Get the value inside the editor area
function get_code() {
    return editor.getValue();
}

function get_text() {
    return document.getElementById("text_area").value;
}

// Get the value of the selected option element and apply that mode to the editor
function change_language() {
    let list = document.getElementById("lang_select");
    let selected_lang = list.options[list.selectedIndex].value;
    console.log(selected_lang);
    lang = selected_lang;
    editor.setOption("mode", selected_lang);
}

// Remove the last input field that was added. 
// By default there must be at least one field (option)
function remove_last_field() {
    let tos = input_elements.pop();
    // if there was still an element
    if(tos) {
        // tos is an object made by an input, a checkbox and a label
        // all three needs to be removed
        tos["input_node"].remove();
        tos["checkbox_node"].remove();
        tos["label_node"].remove();
        number_of_fields--;
    } 
    // hide the button to delete fields if only one field is left 
    if (input_elements.length == 0) {
        document.getElementById("delete_field").style.visibility = "hidden";
    }
}

// Add listeners to remove input fields
function handle_remove_field() {
    document.getElementById("delete_field").addEventListener("click", (e) =>{
        remove_last_field();
    })
}

function post_question() {

    let url = new URL(window.location.href)
    topic_id = url.searchParams.get('topic')

    let n_inputs = document.getElementById("input_counter").value;
    let curr;
    let curr_checkbox;
    let options = [];
    // populate the array of options:
    for(let i=0; i<n_inputs; ++i) {
       curr = document.getElementById(`${i}`);
       curr_checkbox = document.getElementById("check_"+i);
       // the array will contain tuples of the kind: ["option text", "true/false"]
       options.push([curr.value, curr_checkbox.checked]);
    }
    // get question text:
    let question_text = (code_or_text == "code") ? get_code() : get_text();
   
    let body = JSON.stringify({
        answer: options,
        topic: topic_id,
        text: question_text,
        lang: lang
    });

    
    API_question.post_question((body));
}

API_question = (function() {

    function post_question(body) {

        console.log(body)
        console.log("posted from api");
        fetch("/question/new", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
        .then((res) => {
            return res.json();
        });
    }

    return {
        post_question
    }
    
})()