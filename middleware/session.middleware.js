const { v4: uuidv4 } = require("uuid");
const guestSession = (req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = uuidv4();
  }
  next();
};

module.exports = guestSession;
