/*
 * AvailabilitySchema schema
 */

const mongoose = require("mongoose");

const limit = (val) => {
    let subElementsValidated = true;
  
    val.forEach((el) => {
      if (el.length != 2) {
        subElementsValidated = false;
        return;
      }
    });
  
    return subElementsValidated;
  };

const AvailabilitySchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  busy: 
    {
      type: [[Date]],
    //   validate: [limit, "Only 2 elements per array (start and end)"],
      required: true,
    },
  
//   busy:[
//       {start: Date, end: Date}
//   ]
});

const Availability = mongoose.model(
  "Availability",
  AvailabilitySchema
);

module.exports = Availability;