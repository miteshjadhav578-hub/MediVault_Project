const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Patient = require("./models/Patient");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "MediVault Backend Running"
  });
});

// Doctors Route
app.get("/api/doctors", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Dr. Rohan Mehta",
      department: "Orthopedics"
    }
  ]);
});

// Patients Route
app.get("/api/patients", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Rajesh Kumar",
      status: "Active"
    }
  ]);
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    res.json({
      success: true,
      message: "Login Successful"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

  

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists"
      });
    }

    const user = new User({
      username,
      password
    });

    await user.save();

    res.json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

app.post("/api/patients", async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  try {

    const count = await Patient.countDocuments();

    const patientId =
      "MED-" + String(count + 1).padStart(6, "0");

    const patient = new Patient({
  patientId,

  fullName: req.body.fullName,
  dob: req.body.dob,
  gender: req.body.gender,
  bloodGroup: req.body.bloodGroup,
  phone: req.body.phone,

  e1Relation: req.body.e1Relation,
  e1Name: req.body.e1Name,
  e1Phone: req.body.e1Phone,

  e2Relation: req.body.e2Relation,
  e2Name: req.body.e2Name,
  e2Phone: req.body.e2Phone,

  faceImage: req.body.faceImage || "",

  allergies: [],
  treatments: [],
  reports: []
});

    await patient.save();

    res.json({
      success: true,
      patient
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});
// Start Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});