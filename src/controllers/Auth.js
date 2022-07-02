const config = require('../config/config');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
/**
 * Creating tokens
 * Using jsonwebtoken
 * @param user
 * @returns
 */
function createToken(user) {
  return jsonwebtoken.sign(
    {
      id: user._id,
      email: user.email
    },
    config.jwt.secret,
    {
      expiresIn: 60 * 60 * 24
    }
  );
}
/**
 * User registration function
 * @param req
 * @param res
 * @returns
 */
module.exports.signUp = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.password) {
    return res.status(400).json({ msg: 'Please, send your email and password.' });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists!' });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

/**
 * User login function
 * @param req
 * @param res
 * @returns
 */
module.exports.signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Please, send your email and password.' });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: 'User does not exixts!' });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    return res.status(201).json({ token: createToken(user) });
  }

  return res.status(400).json({ msg: 'The email or password are incorrect!' });
};
