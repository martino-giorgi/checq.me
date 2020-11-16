var number_of_fields = 1;

/*
    Appends a new input of type text to the form used to create multiple choice questions
    everytime the button to add a field is clicked
    The inputs have id=i and name=i for i in [0,1,2...]
*/
document.getElementById('new_field').addEventListener( "click", (e) => {
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
    
    document.querySelector('form')
    .appendChild(input_node);
    document.querySelector('form')
    .appendChild(checkbox_node);
    document.querySelector('form')
    .appendChild(label_node);
    
})