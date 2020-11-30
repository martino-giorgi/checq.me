const mongoose = require("mongoose");

/*===========================
CLASSROOM FUNCTIONS
============================*/

async function re_mapTAs(classroom_id) {
  return new Promise((resolve, rejects) => {
    let mapped = {};
    let ta_ids = [];
    let current = 0;

    function increaseTa() {
      if (current == ta_ids.length - 1) {
        current = 0;
      } else {
        current++;
      }
    }
    const Classroom = require("../models/Classroom");
    Classroom.findById(classroom_id)
      .select({ teaching_assistants: 1, lecturer: 1, partecipants: 1 })
      .then((r) => {
        r.teaching_assistants.forEach(e => {
          ta_ids.push(e);
        })
        ta_ids.push(r.lecturer);
        let stud_ids = r.partecipants;
        stud_ids.forEach((s_id) => {
          mapped[s_id] = ta_ids[current];
          increaseTa();
        });

        r.ta_mapping = mapped;
        console.log("Re-mapped TAs to Students for classroom: " + classroom_id);
        r.save((err) => {
          if (err) {
            res.status(500).end();
          }
        });

        resolve(r);
      })
      .catch((err) => rejects(err));
  });
}

function updateUser(user_id, classroom_id) {
  const User = require("../models/User");
  const ClassroomGrades = require("../models/ClassroomGrades");
  let classroom_grade = new ClassroomGrades({
    _userId: user_id,
    _classroomId: classroom_id,
  });
  classroom_grade.save().then(() => {
    User.findById(user_id)
      .then((u) => {
        console.log("user found");
        u.classrooms_grades.set(classroom_id.toString(), classroom_grade._id);
        u.save()
          .then(() => {return classroom_grade})
          .catch((err) => console.log(err));
      }).catch((err) => console.log(err));
  });
}

/*===========================
        USER FUNCTIONS
============================*/


module.exports = {
  re_mapTAs,
  updateUser,
};


