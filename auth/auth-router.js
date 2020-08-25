const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("./auth-model.js");
const { isValid } = require("./auth-service.js");
const constants = require("../config/constants.js");

router.post("/signup", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    // implement registration
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash password
    const hash = bcrypt.hashSync(credentials.password, rounds);

    credentials.password = hash;

    //save user to db
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password. (The password shoud be alphanumeric)",
    });
  }
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password and the hash stored in the db
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken(user);

          res.status(200).json({
            message: "Welcome to the API",
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ errorMessage: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password. (The password shoud be alphanumeric)",
    });
  }
});

function signToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = constants.jwtSecret;

  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
