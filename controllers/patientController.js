const { user } = require("pg/lib/defaults");
const { Patient, DoctorPatient, Doctor } = require("../models");
require('dotenv').config()
const nodemailer = require('nodemailer');
const { compareHash } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

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
            throw { name: "D_NOT_FOUND" };
          } else {
            const isValid = compareHash(req.body.password, response.password);
            console.log(isValid, "<<<< isValid");
            console.log(response.id, "<<<< response id");
            if (!isValid) {
              throw { name: "D_NOT_FOUND" };
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
        try{
          const {idToken} = req.body
          // console.log(idToken, '<<<<<<<<<<<< id TOKKEENNNNN')
          const client = new OAuth2Client(process.env.CUSTOMER_ID);
          const ticket = await client.verifyIdToken({
              idToken,
              audience: process.env.CUSTOMER_ID
          })
          const payload = ticket.getPayload()
          //console.log(payload)
          const customer = await Customer.findOne({
              where: {
                  email: payload.email
              }
          })
    
          let token
          let obj = {}
    
          if(customer){
              token = generateToken({email: customer.email, username: customer.username,  id:customer.id})
              obj = {
                  access_token:token,
                  username:customer.username,
                  role:customer.role,
                  id:customer.id
              }
              
          } else {
              const createCustomer = await Customer.create({
                  username: payload.name,
                  email: payload.email,
                  password: 'admingoogle',
                  role:'customer',
                  phoneNumber:999998888,
                  address: 'jl. google kec chrome'
                  
              })
              token = generateToken({email: createCustomer.email, username: createCustomer.username, id: createCustomer.id})
              obj = {
                  access_token:token,
                  username:createCustomer.username,
                  role:createCustomer.role,
                  id:createCustomer.id
              }
          }
          res.status(200).json(obj)
          
      } catch (err) {
          console.log(err)
      }
      }

}

module.exports = patientController;
