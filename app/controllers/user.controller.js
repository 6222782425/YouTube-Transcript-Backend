// const { response } = require("express");
// const db = require("../models");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  // Validate request
  // if (!req.body.firstlastname) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }
  // console.log(req.body);
  const { email, password, firstlastname } = req.body;
  try {
    if (!(email && password && firstlastname)) {
      res.status(400).send("All input is required");
    }

    const oldUserEmail = await User.findOne({ email });

    if (oldUserEmail) {
      return res
        .status(409)
        .send(
          "User Already Exist. Please use other username or email. If alreadly signup please Login"
        );
    }
    // console.log(password);
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstlastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    // console.log(process.env.TOKEN_KEY);
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // console.log(input);
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    // console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      // console.log("hi");
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

exports.findAll = (req, res) => {
  const firstlastname = req.query.firstlastname;
  var condition = firstlastname
    ? { firstlastname: { $regex: new RegExp(firstlastname), $options: "i" } }
    : {};
  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const email = req.email;
  console.log(email);
  User.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Tutorial with id " + email });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + email });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.findMe = (req, res) => {
  const userId = req.user.user_id;
  User.findById({ _id: userId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
