var number_of_fields = 1;
const max_fields = 6;
// TODO: stack of inputs elements to allow to remove fields
// TODO: allow only a certain umber of fields
var input_elements = [];
var code_area;
var text_area;
var editor;

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
        number_of_fields ++;

        var checkbox_node = document.createElement("input");
        checkbox_node.type = "checkbox";
        checkbox_node.checked = true;
        
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
    
    if (text_area.className == "hidden") {
        text_area.classList.remove("hidden");
        code_area.classList.add("hidden");
    } 
    else {
        text_area.classList.add("hidden");
        code_area.classList.remove("hidden");
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
    code_area = document.getElementsByClassName("CodeMirror")[0];
    text_area = document.getElementById("text_area");
    code_area.classList.add("hidden");
}

// Get the value inside the editor area
function get_code() {
    return editor.getValue();
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

API_question = (function() {

    return {
        code_area,
        text_area
    }
    
})()