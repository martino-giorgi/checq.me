var questions = undefined;
var i = 0;
var editor = undefined;
var options = undefined;

/**
 * Initializes the view by showing the first question and adding event listeners.
 */
function init_answer_question() {
    
    let url = new URL(window.location.href)
    let topic_id = url.searchParams.get('topic')

    get_questions(topic_id).then( res => {
        questions = res;
        console.log(questions);
        if (questions && questions.length > 0) {
            i = 0;
            set_question(questions[0])
            handle_next_button()
            init_editor(questions[0]);
            handle_check_button();
            update_bar()
            handle_delete_button();
        }
        else {
            document.getElementById("question_area").innerHTML = "<h1> No questions found";
        }

    })
}

/**
 * Updates the width of the progrss bar depending on the current rendered question
 * Hence depending on the value of i in relationship to the number of questions
 */
function update_bar() {
    let bar = document.getElementById("questions_bar");
    let val = (( i % questions.length) / questions.length)*100 ;
    val = val == 0? 100 : val;
    bar.style.width = `${val}%`;
}

/**
 * Creates the input fields for each option of the question,
 * set the inputs and the next button.
 * @param {Object} q The question to be set
 */
function set_question(q) {
    options = [];
    let section = document.getElementById("options_section");
    section.innerHTML = "";

    // Show input buttons
    for (let j=0; j < q.answer.length; ++j) {
        let new_input = document.createElement("label");
        new_input.id = "label"+j;
        new_input.innerHTML = q.answer[j][0];

        let new_checkbox = document.createElement("input");
        new_checkbox.type = "checkbox";
        new_checkbox.classList.add("option_checkbox")
        new_checkbox.value = j;
        section.appendChild(new_input);
        section.appendChild(new_checkbox);
        options.push(new_checkbox);
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

/**
 * Set the new question and update the editor when navigating through questions
 * @listens click
 */
function handle_next_button() {
    let button = document.getElementById("next_question");
    button.addEventListener("click", (e)=> {
        let value = button.value;
        set_question(questions[value]);
        update_editor(questions[value]);
        update_bar();
        //handle_delete_button();
    })
}

/**
 * Creates the body object containing the options selected by the user
 * to be send to the server to be checked
 * @listens click
 */
function handle_check_button() {
    let btn = document.getElementById("check_answer");
    
    btn.addEventListener("click", (e) => {
        let checkboxes = document.getElementsByClassName("option_checkbox");
        let hidden = document.getElementById("question_id");
        let checked_answers = [];
        let selected = [];
        for (const c of checkboxes) {
            if (c.checked) {
                checked_answers.push(c.value);
                selected.push(document.getElementById("label"+ c.value)); 
            }
        }
        let body = JSON.stringify({
            answers: checked_answers,
            question: hidden.value
        })
        check_question(body).then( res=> {
            // After getting the result, show it to the user in the view
            show_answer(res.result, selected);
        })
    })
}

function handle_delete_button() {
    let button = document.getElementById("delete_question_btn");
    if(button){
        button.addEventListener("click", e=> {
            let url = new URL(window.location.href)
            let topic = url.searchParams.get('topic')
            let classroom = url.searchParams.get('classroom_id');
           
            let j = (i-1) % questions.length;
             
            let body = {
                question_id: questions[j]._id,
                topic_id: topic,
                classroom_id: classroom
            }
            console.log("try deleted", questions[j]);
            delete_question(JSON.stringify(body), classroom);
            
        })
    }
}
 
/**
   * Shows on the browser whether the given answer was correct.
   * If the answers is correct it will also send a click event to 
   * move to the new question after 1sec.
   *
   * @param {Boolean} res The result of the given answer
   */
function show_answer(res, selected_labels) {
    let result_section = document.getElementById("answer_result");
            if(res) {
                result_section.innerHTML = "CORRECT!";
                result_section.style.color = "green";

                let button = document.getElementById("next_question");
                let clickEvent = new Event('click');

                let bar = document.getElementById("progress_bar");
                bar.classList.add("progress_bar_animated");
                selected_labels.forEach(l => {
                    l.classList.add("big_green_label")
                });
                setTimeout(function(){ 
                    result_section.innerHTML="";
                    button.dispatchEvent(clickEvent); 
                    bar.classList.remove("progress_bar_animated");
                    selected_labels.forEach(l=>{
                        l.classList.remove("big_green_label");
                    })
                }, 1000);
                
            } else {
                result_section.innerHTML = "WRONG!"
                result_section.style.color = "red"

                uncheck_all_options(options);

                setTimeout(function(){ 
                    result_section.innerHTML="";
                }, 1000);
            }        
}

/**
 * Initializes the textarea with CodeMirror, setting the correct language
 * and the content.
 * @param {Object} first_q The first question of the questions for the topic
 */
function init_editor(first_q) {
    let txt_area = document.getElementById("text_area");
    let lang = first_q.lang;

    editor = CodeMirror.fromTextArea(txt_area, {
        lineNumbers: true,
        mode: lang,
        theme: "dracula",
        readOnly: true,
        tabSize: 4
    });

    editor.setValue(first_q.text);
}

/**
 * Updates the editor with the new language and content for the given question.
 * @param {Object} q The new question 
 */
function update_editor(q) {
    editor.setValue(q.text);
    editor.setOption("mode", q.lang);
}

// DB comunication

/**
 * Get all the questions for the topic.
 * @param {ObjectId} id The id of the topic
 * @returns {Promise} The promise that will give all the questions for this topic
 */
function get_questions(id) {
    return fetch("/topic/"+id+"/questions").then( res => {
        return res.json();
    })
}

/**
 * Sends the options selected by the user and checks if they are the expected answer.
 * @param {Object} body The object containing the given answers
 * @returns {Promise} The promise containing the asnwer from the server (true/false)
 */
function check_question(body) {
    return fetch("/question/check", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
    })
    .then( res => {
        return res.json();
    })
}

function delete_question(body, classroom_id) {
    fetch(`/question?classroom_id=${classroom_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: body
    })
    .then( res => {
        if(res.status == 204) {
            window.FlashMessage.success("Question deleted");
            i = (i-1) % questions.length;
            console.log("prima", questions, i);
            console.log("----------------");
            questions.splice(i,1);
            console.log("dopo", questions);
            if (questions && questions.length > 0) {
                i = 0;
                set_question(questions[0])
                update_editor(questions[0]);
                update_bar()
            }
            else {
                document.getElementById("question_area").innerHTML = "<h1> No questions found";
            }
        }
    })
}

/**
 * Uncheck all selected options
 * @param {Array} opts array of options to uncheck
 */
function uncheck_all_options(opts) {
    opts.forEach(o => {
        o.checked = false;
    });
}
