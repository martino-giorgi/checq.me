const mongoose = require("mongoose");

async function mapTAs(classroom_id) {

    return new Promise((resolve, rejects) => {
      let mapped = {};
      let ta_ids;
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
          ta_ids = r.teaching_assistants;
          ta_ids.push(r.lecturer);
          let stud_ids = r.partecipants;
          stud_ids.forEach((s_id) => {
            mapped[s_id] = ta_ids[current];
            increaseTa();
          });

          r.ta_mapping = mapped;

          r.save((err) => {
            if (err) {
              res.status(500).end();
            }
          });

          resolve(r);
        }).catch(err => rejects(err));
    });
}

module.exports = mapTAs;