function init(){
    API.getClasses().then(user_classrooms => {
        // document.getElementById("test").innerHTML = "";
        console.log(user_classrooms);
        document.getElementById("classroom_selection_wrapper").innerHTML = ejs.views_scheduler_selection({classrooms: user_classrooms})
        populate(user_classrooms[0]._id);
    })
}


function populate(classroom_id){
    
}

API = function () {
    function getClasses(){
        return fetch("/classrooms").then(res => {
            return res.json();
        })
    }
    return{
        getClasses,
    }
}()