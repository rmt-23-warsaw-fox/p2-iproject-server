// let r = (Math.random() + 1).toString(36).substring(7);
// console.log("random", r);

const { verification } = require("./helpers/sib");

const recipient = "nanemquan@outlook.com";
const link = "www.google.com";
verification(recipient, link);
