const { Post } = require("../models");
const { payloadToToken, tokenToPayload } = require('../helper/jwt')
const postAuthorization = async (req, res, next) => {
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
        req.user.role = userFound.role;
        req.user.id = userFound.id;
        // console.log(req.user);
        const id = req.params.id;
        let post = await Post.findByPk(id);
        // console.log(userId + "  dan  " + post.AuthorId)
        if (!post) {
          throw { statusCode: 404 };
        } else if (userId !== post.AuthorId && role !== "Admin") {
          throw { statusCode: 403 };
        } else {
          next();
        }
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
