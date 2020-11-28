/*
 * AvailabilitySchema schema
 */

const AvailabilitySchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  busy: 
    {
      type: [[Date]],
      required: true,
    },
});

const Availability = mongoose.model(
  "Availability",
  AvailabilitySchema
);

module.exports = Availability;