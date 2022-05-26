"use strict";
const errorHandlres = async (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const msg = err.errors.map((e) => {
      return {
        message: e.message,
      };
    });
    res.status(400).json({
      message: msg,
    });
  } else if (
    err.message === "Invalid login, please check your input!" ||
    err.message === "Invalid Password!"
  ) {
    res.status(401).json({
      message: err.message,
    });
  } else if(err.message === "User Not Found") {
    res.status(404).json({
      message:err.message
    })
  } else {
    res.status(500).json({
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

module.exports = errorHandlres;
