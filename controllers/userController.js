const { comparePassword, createToken } = require('../helpers/index')
const {User} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const nodemailer = require('nodemailer')

class UserController {
  static async userRegister(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        phoneNumber,
      } = req.body

      const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
      })

      let sendEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'iqbal.muh998@gmail.com',
          pass: 'kqboucqllkvhtmiu'
        }
      })
      let mailOptions = {
        from: 'iqbal.muh998@gmail.com',
        to: email,
        subject: 'Berhasil Register',
        text: `Selamat anda telah berhasil melakukan register`
      }
  
      sendEmail.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw new Error(900)
        }
      })

      res.status(201).json({
        statusCode: 201,
        message: 'User created successfully',
        data: {
          id: newUser.id,
          email: newUser.email
        }
      })

    } catch(err) {
      next(err)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT);
      const {token} = req.body
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT
    });
    const payload = ticket.getPayload();

    const [newUser, created] = await User.findOrCreate({
      where: { email: payload.email },
      defaults: {
        name: payload.email.split('@')[0],
        password: '12345',
      }
    });
    
    const access_token =  createToken({
      id: newUser.id,
      email:newUser.email,
    })
    res.status(200).json({
      statusCode: 200,
      message: 'login success',
      access_token,
      id: newUser.id,
    })

    }

    catch(err) {
      console.log(err);
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const {email, password} = req.body
      if(!email || !password) {
        throw new Error('401')
      }

      const findUser = await User.findOne({
        where: {
          email
        }
      })

      if(!findUser) {
        throw new Error('401')
      }

      const comparePass = comparePassword(password, findUser.password)
      if(!comparePass) {
        throw new Error('401')
      }

      const payLoad = {
        id: findUser.id,
        email: findUser.email
      }

      const access_token = createToken(payLoad)

      res.status(200).json({
        statusCode: 200,
        message: 'success login',
        access_token,
        id: findUser.id
      })

    } catch(err) {
      console.log(err);
      err.login = true
      next(err)
    }
  }
}

module.exports = UserController