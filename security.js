const jwt = require("jsonwebtoken");
var crypto = require("crypto");

const password = "password";

const getHash = (path) => {
  return crypto.createHash("md5").update(path).digest("hex");
};
const getToken = (path) => {
  const token = jwt.sign({ path: getHash(path) }, password, {
    expiresIn: `1m`,
  });
  console.log("getToken", token, path);
  return token;
};

const verifyToken = (token, path) => {
  console.log("verifyToken", token, path);
  try {
    const payload = jwt.verify(token, password);
    if (payload.path === getHash(path)) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

const ensureAuthenticated = (req, res, next) => {
  const requestPath = req.path;
  const token = req.query.token;
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }
  console.log("path", requestPath);
  if (!verifyToken(token, requestPath)) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
};

module.exports = {
  getToken,
  ensureAuthenticated,
};
