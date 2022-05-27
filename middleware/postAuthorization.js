const { User,Post } = require("../models");
const { payloadToToken, tokenToPayload } = require('../helper/jwt')
const postAuthorization = async (req, res, next) => {
  try {
    let accessToken = req.headers.access_token;
    //if token valid
    if (!accessToken) {
      throw (401);
    } else {
      const payload = tokenToPayload(accessToken);
       //console.log(payload);
      const userFound = await User.findByPk(payload.id);
      if (userFound) {
        req.user.role = userFound.role;
        req.user.id = userFound.id;
         //console.log(req.params.id);
        const id = req.params.id;
        let post = Post.findByPk(id).then((result)=>{
          if (!result) {
            console.log("Post is here")
            throw { statusCode: 404 };
          } else if (userFound.id !== result.AuthorId && userFound.role !== "Admin") {
            console.log("Post is here")
            throw { statusCode: 403 };
          } else {
            console.log("Post is here")
            next();
          }
        });
         
      }else{
        throw (401);
      }
    }

  }
  catch (error) {
    next(error);
  }
};

const userAuthorization = async (req, res, next) => {
  try {
    let accessToken = req.headers.access_token;
    //if token valid
    if (!accessToken) {
      throw (401);
    } else {
      const payload = tokenToPayload(accessToken);
      // console.log(payload);
      const userFound = await User.findByPk(payload.id);
      if (userFound) {
        
        if(userFound.role=="Admin"){
          req.user.role = userFound.role;
          req.user.id = userFound.id;
          // console.log(req.user);
          next();
        }else{
          throw(401);
        }
        
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { postAuthorization, userAuthorization };
