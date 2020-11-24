var questions = undefined;
var i = 0;
var editor = undefined;

function init_answer_question() {
    
    let url = new URL(window.location.href)
    topic_id = url.searchParams.get('topic')
    console.log(topic_id)

    get_questions(topic_id).then( res => {
        //console.log(res);
        questions = res;

        if (questions && questions.length > 0) {
            set_question(questions[0])
            handle_next_button()
            init_editor(questions[0]);
        }

    })
}

function set_question(q) {
    
    let section = document.getElementById("options_section");
    section.innerHTML = "";

    // Show input buttons
    for (let i=0; i< q.answer.length; ++i) {
        console.log(q.answer[i]);
        new_input = document.createElement("label");
        
        new_input.innerHTML = q.answer[i][0];

        new_checkbox = document.createElement("input");
        new_checkbox.type = "checkbox";
        section.appendChild(new_input);
        section.appendChild(new_checkbox);
    }

    // Set next button
    let btn = document.getElementById("next_question");
    btn.value = ( (++i) % questions.length );
    console.log(btn.value);
}

function handle_next_button() {
    let button = document.getElementById("next_question");
    button.addEventListener("click", (e)=> {
        
        let value = button.value;
        set_question(questions[value]);
        update_editor(questions[value]);
    })
}

function init_editor(first_q) {
    let txt_area = document.getElementById("text_area");
    let lang = first_q.lang;
    console.log(lang);

    editor = CodeMirror.fromTextArea(txt_area, {
        lineNumbers: true,
        mode: lang,
        theme: "dracula",
        readOnly: true,
        tabSize: 4
    });

    editor.setValue(first_q.text);
}

function update_editor(q) {
    editor.setValue(q.text);
    editor.setOption("mode", q.lang);
}

// DB comunication

function get_questions(id) {
    return fetch("/topic/"+id+"/questions").then( res => {
        return res.json();
    })
}


// return fetch("/classroom/"+id).then( res => {
//     return res.json();
//   })