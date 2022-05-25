async function isAdmin(req, res, next) {
  try {
    const { role } = req.pass;
    if (role !== "admin") {
      throw new Error("Admin only");
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = isAdmin;
