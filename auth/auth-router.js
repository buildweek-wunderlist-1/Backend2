const bc = require("bcryptjs");
const router = require("express").Router();
const Users = require("./users-model");
const { isValidUser, createToken } = require("../utils");

router.post("/register", async (req, res) => {
  const newUser = req.body;
  if (isValidUser(newUser)) {
    // hash the password
    const { password } = newUser;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bc.hashSync(password, rounds);
    // store user in the database and resolve endpoint
    try {
      const [id] = await Users.insert({ ...newUser, password: hash });
      console.log(id);
      const token = createToken({ ...newUser, id });
      res.status(201).json({ token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Unable to create user" });
    }
  } else {
    res.status(400).json({ message: "Please provide proper credentials" });
  }
});

router.post("/login", async (req, res) => {
  const { body: credentials } = req;
  if (isValidUser(credentials)) {
    const { username, password } = credentials;
    // run query based on passed in username
    try {
      const [user] = await Users.findBy({ username });
      // If user is found and passwords match
      if (user && bc.compareSync(password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token });
      } else {
        // No user OR wrong password
        res.status(401).json({ message: "Please provide valid credentials" });
      }
    } catch (e) {
      res.status(500).json({ message: "An error occurred while logging in" });
    }

    // Send back a token
  } else {
    res.status(400).json({ message: "Please provide valid credentials" });
  }
});

// Test Endpoint
router.get("/", (req, res) => {
  res.status(200).json({ router: "up" });
});

module.exports = router;
