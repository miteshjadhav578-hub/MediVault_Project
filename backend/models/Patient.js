const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true
  },

  fullName: String,
  dob: String,
  gender: String,
  bloodGroup: String,
  phone: String,

  e1Relation: String,
  e1Name: String,
  e1Phone: String,

  e2Relation: String,
  e2Name: String,
  e2Phone: String,

  faceImage: String,

  allergies: [String],
  treatments: [String],
  reports: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Patient", PatientSchema);