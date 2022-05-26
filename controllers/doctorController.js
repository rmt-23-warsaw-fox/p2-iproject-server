const { toVerify, compareHash } = require("../helpers/bcrypt");
const { toToken, generateToken } = require("../helpers/jwt");
const { Doctor, DoctorPatient, Patient } = require("../models");

class doctorController {
  static async login(req, res, next) {
    console.log("Doctor login controller");
    console.log(req.body.email, "<<<<<<<<<");

    try {
      const response = await Doctor.findOne({
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
          doctor_id: response.id,
          doctor_email: response.email,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async myAppointments2(req, res, next) {
    console.log("My appointments 2");
    const { id } = req.user;
    try {
      const response = await DoctorPatient.findAll({
        where: {
          PatientId: id,
        },
        include: {
          model: Patient,
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
  }

  static async Approve(req, res, next) {
    const {approveId} = req.params;
    const { id } = req.user;
    const {patientId} = req.body
    console.log(req.body)
    console.log('approve id', approveId)
    console.log('patientId', patientId)
    try {
      const FindPatient = await DoctorPatient.findByPk(patientId);
      if (!FindPatient) {
        throw { name: "Patient not found" };
      }

      console.log(FindPatient)

      if (FindPatient.DoctorId !== id) {
        throw { name: "You are not authorized" };
      }

      await DoctorPatient.update(
        {
          status: "approved",
        },
        {
          where: { id: approveId },
        }
      );

      res.status(200).json({
        message: "Approved",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = doctorController;
