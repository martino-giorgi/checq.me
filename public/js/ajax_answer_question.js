var questions = undefined;
var i = 0;

function init_answer_question() {
    
    let url = new URL(window.location.href)
    topic_id = url.searchParams.get('topic')
    console.log(topic_id)

    get_questions(topic_id).then( res => {
        //console.log(res);
        questions = res;

        if (questions && questions.length > 0) {
            set_question(questions[0])
        }
    })
}

function set_question(q) {
    
    let section = document.getElementById("options_section");
    //console.log(q)
    for (let i=0; i< q.answer.length; ++i) {
        console.log(q.answer[i]);
        new_input = document.createElement("input");
        new_input.type = "text";
        new_input.value = q.answer[i][0];

        new_checkbox = document.createElement("input");
        new_checkbox.type = "checkbox";
        section.appendChild(new_input);
        section.appendChild(new_checkbox);
    }
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