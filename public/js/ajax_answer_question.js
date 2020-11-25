var questions = undefined;
var i = 0;
var editor = undefined;

function init_answer_question() {
    
    let url = new URL(window.location.href)
    topic_id = url.searchParams.get('topic')
    console.log(topic_id)

    get_questions(topic_id).then( res => {
        console.log(res);
        questions = res;

        if (questions && questions.length > 0) {
            i = 0;
            set_question(questions[0])
            handle_next_button()
            init_editor(questions[0]);
            handle_check_button();
        }

    })
}

function set_question(q) {
    
    let section = document.getElementById("options_section");
    section.innerHTML = "";

    // Show input buttons
    for (let j=0; j < q.answer.length; ++j) {
        console.log(q.answer[j]);
        new_input = document.createElement("label");
        
        new_input.innerHTML = q.answer[j][0];

        new_checkbox = document.createElement("input");
        new_checkbox.type = "checkbox";
        new_checkbox.classList.add("option_checkbox")
        new_checkbox.value = j;
        section.appendChild(new_input);
        section.appendChild(new_checkbox);
    }

    let hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.value = q._id;
    hidden.id = "question_id";
    section.appendChild(hidden);

    // Set next button
    let btn = document.getElementById("next_question");
    
    btn.value = ( (++i) % questions.length );
    
}

function handle_next_button() {
    let button = document.getElementById("next_question");
    button.addEventListener("click", (e)=> {
        
        let value = button.value;
        set_question(questions[value]);
        update_editor(questions[value]);
    })
}

function handle_check_button() {
    let btn = document.getElementById("check_answer");
    
    btn.addEventListener("click", (e) => {
        let checkboxes = document.getElementsByClassName("option_checkbox");
        let hidden = document.getElementById("question_id");
        console.log(hidden);
        let checked_answers = []
        for (const c of checkboxes) {
            if (c.checked) {
                checked_answers.push(c.value);
                //console.log(c);
            }
        }
        let body = JSON.stringify({
            answers: checked_answers,
            question: hidden.value
        })
        check_question(body).then( res=> {
            // After getting the result, show it to the user in the view
            let result_section = document.getElementById("answer_result");
            if(res.result) {
                result_section.innerHTML = "CORRECT!"
                result_section.style.color = "green"
            } else {
                result_section.innerHTML = "WRONG!"
                result_section.style.color = "red"
            }
            // make it disappear after 1 second
            setTimeout(function(){ result_section.innerHTML=""; }, 1000);
        })
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

function check_question(body) {
    console.log(body);
    return fetch("/question/check", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    })
    .then( res => {
        return res.json();
    })
}


// return fetch("/classroom/"+id).then( res => {
//     return res.json();
//   })