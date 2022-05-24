require("dotenv").config();
const { User } = require("../models");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { payloadToToken } = require("../helper/jwt");
const { Op } = require("sequelize")
const { OAuth2Client } = require('google-auth-library');

class UserController {

    static async login(req, res, next) {
        try {

            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { username: email }
                    ]
                },
            });

            if (!user) {
                throw { statusCode: 401, name: "INVALID_USERNAME" };
            }
            console.log("Password is " + hashPassword(password))
            console.log("Password is " + user.password);
            const same = comparePassword(password, user.password);
            //const same = password == user.password;

            if (!same) {
                throw { statusCode: 401, name: "INVALID_PASSWORD" };
            }

            const payload = { id: user.id, role: user.role };

            const token = payloadToToken(payload);

            res.status(200).json({
                access_token: token,
                email: user.email
            });
        } catch (error) {
            next(error);
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            let { idToken } = req.body
            console.log(idToken)
            let client = new OAuth2Client(process.env.authClient);

            let ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.authClient,
            });
            let payload = ticket.getPayload()
            console.log(payload);

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    password: Math.random().toString(20).substring(1, 6),
                    role: "customer"
                }
            })

            console.log(user.email, "<--- this is user")
            payload = { id: user.id, email: user.email, role: user.role };

            let token = payloadToToken(payload);

            res.status(200).json({
                access_token: token,
                email: user.email
            });

        } catch (err) {
            next(err);
        }
    }

    static logout(req, res) {

    }

    static async list(req, res) {
        try {
            const users = await User.findAll();
            res.send(users);
        } catch (error) {

        }
    }
    static async registerAdmin(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address, role } = req.body;
            //password=hashPassword(password);
            const user = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                role
            });
            res.status(201).json({
                message: email + " as " + role + " registered"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async register(req, res, next) {
        try {
            let { username, email, password, phoneNumber, address } = req.body;
            //password=hashPassword(password);
            const user = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                role: "customer",
            });
            res.status(201).json({
                message: email + " as customer registered"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = UserController