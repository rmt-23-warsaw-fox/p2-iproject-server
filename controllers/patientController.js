const { user } = require("pg/lib/defaults");
const { Patient, DoctorPatient, Doctor } = require("../models");
require('dotenv').config()
const nodemailer = require('nodemailer');
const { compareHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class patientController {

}

module.exports = patientController;
