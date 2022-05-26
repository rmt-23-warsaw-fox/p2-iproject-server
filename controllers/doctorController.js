const { toVerify } = require("../helpers/bcrypt");
const { toToken } = require("../helpers/jwt");
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
              customer_id: response.id,
              customer_email: response.email,
            });
          }
        } catch (err) {
          console.log(err);
          next(err);
        }
      }

    static async Approve(req, res, next){
        const patientId = req.params.id;
        const { id } = req.user;
        try {
          const FindPatient = await DoctorPatient.findByPk(patientId);
          if (!FindPatient) {
            throw { name: "Patient not found" };
          }
      
          if (FindPatient.DoctorId !== id) {
            throw { name: "You are not authorized" };
          }
      
          await MyHero.update(
            {
              status: "Played",
            },
            {
              where: { HeroId: heroId },
            }
          );
      
          res.status(200).json({
            message: "Hero has been played",
          });
        } catch (err) {
          console.log(err);
          next(err);
        }
      };
}

module.exports = doctorController