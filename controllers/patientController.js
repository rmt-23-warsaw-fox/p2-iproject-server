const { user } = require("pg/lib/defaults");
const { Patient, DoctorPatient, Doctor } = require("../models");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { compareHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { type } = require("express/lib/response");
const {Op} = require('sequelize');

class patientController {
  static async register(req, res, next) {
    const { name, email, password, phoneNumber, address } = req.body;
    const obj = {
      name,
      email,
      password,
      phoneNumber,
      symptomps: "0,0,0",
      address,
    };

    try {
      const response = await Patient.create(obj);
      res.status(201).json({
        message: "Patient success dibuat",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    console.log("Patient login controller");
    console.log(req.body.email, "<<<<<<<<<");

    try {
      const response = await Patient.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!response) {
        throw { name: "P_NOT_FOUND" };
      } else {
        const isValid = compareHash(req.body.password, response.password);
        console.log(isValid, "<<<< isValid");
        console.log(response.id, "<<<< response id");
        if (!isValid) {
          throw { name: "P_NOT_FOUND" };
        }
        const payload = {
          id: response.id,
        };
        const token = generateToken(payload);

        res.status(200).json({
          statusCode: 200,
          access_token: token,
          customer_id: response.id,
          customer_email: response.email,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async googleAuth(req, res, next) {
    try {
      const { idToken } = req.body;
      // console.log(idToken, '<<<<<<<<<<<< id TOKKEENNNNN')
      const client = new OAuth2Client(process.env.CUSTOMER_ID);
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.CUSTOMER_ID,
      });
      const payload = ticket.getPayload();
      //console.log(payload)
      const customer = await Customer.findOne({
        where: {
          email: payload.email,
        },
      });

      let token;
      let obj = {};

      if (customer) {
        token = generateToken({
          email: customer.email,
          username: customer.username,
          id: customer.id,
        });
        obj = {
          access_token: token,
          username: customer.username,
          role: customer.role,
          id: customer.id,
        };
      } else {
        const createCustomer = await Customer.create({
          username: payload.name,
          email: payload.email,
          password: "admingoogle",
          role: "customer",
          phoneNumber: 999998888,
          address: "jl. google kec chrome",
        });
        token = generateToken({
          email: createCustomer.email,
          username: createCustomer.username,
          id: createCustomer.id,
        });
        obj = {
          access_token: token,
          username: createCustomer.username,
          role: createCustomer.role,
          id: createCustomer.id,
        };
      }
      res.status(200).json(obj);
    } catch (err) {
      console.log(err);
    }
  }
  static async read(req, res, next) {
    console.log("read controller");
    const {page, speciality, name} = req.query
    console.log('req.query', req.query)
    try {
      const condition = {
          limit: 4,
          offset: (page - 1) * 4,
      }
      
      if(speciality){
         condition.where = {
             speciality: {
                 [Op.iLike]: `%${speciality}%`
             }
         }
      }

      if(name){
        condition.where = {
            ...condition.where,
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
     }
      console.log(condition)
      const response = await Doctor.findAll(condition);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async request(req, res, next) {
    console.log("request controller");
    console.log(req.body, "<<<<< req.body request");
    try {
      const response = await Doctor.findByPk(req.body.DoctorId);
      const response2 = await Patient.findByPk(req.body.PatientId);
      await DoctorPatient.create({
        DoctorId: req.body.DoctorId,
        PatientId: req.body.PatientId,
        status: "pending",
      });
      console.log(response.dataValues.email);
      console.log(response2.dataValues.email);
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hcms.edgar.test@gmail.com",
          pass: process.env.HCMS_PASS,
        },
      });

      let mailOptions = {
        from: "hcms.edgar.test@gmail.com",
        to: response.dataValues.email,
        subject: "Patient request",
        text: `customer with email ${response2.dataValues.email} has requested an appointment with you`,
      };

      transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
        }
      });
    } catch (err) {
      next(err);
    }
  }

 static async myAppointments (req, res, next) {
    console.log("My appointments")
    const { id } = req.user;
    try {
      const response = await DoctorPatient.findAll({
        where: {
          PatientId: id,
        },
        include: {
          model: Doctor,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  
  
}

module.exports = patientController;
