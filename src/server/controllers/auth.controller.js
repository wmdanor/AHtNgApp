const {RES_ProfileCreated} = require("./responses");
const {
  addUser,
  getUserToken,
} = require('../services/users.service');
const {
  ArgumentError,
  BadRequestError,
} = require('../models/errors');

const registerUser = async (req, res) => {
  const {
    email,
    username,
    password,
  } = req.body;

  await addUser({email, username, password});

  res.json({message: RES_ProfileCreated});
};

const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const token = await getUserToken({email, password});

    res.cookie('jwt', token).json({
      jwt_token: token,
    });
  } catch (err) {
    if (err instanceof ArgumentError) {
      throw new BadRequestError(err.message);
    } else {
      throw err;
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
};
