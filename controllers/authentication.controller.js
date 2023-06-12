const { user } = require('../models');
const { error, success } = require('../utils/response/json.utils');
const bcrypt = require('bcrypt');

module.exports = {
  login: async (req, res) => {
    let message = 'Login failed, username/password does not match';

    try {
      const userGame = await user.findOne({
        where: { username: req.body.username },
      });

      //   Password not valid
      if (!userGame.validPassword(req.body.password)) {
        return error(res, 400, message, {});
      }

      //if login sucess
      return success(res, 200, 'Login sucess', {
        token: userGame.generateToken(),
      });
    } catch (err) {
      return error(res, 400, err.message, {});
    }
  },
  register: async (req, res) => {
    try {
      let userGame = await user.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        isAdmin: false,
      });

      //   res.redirect('/login');
      return success(res, 201, 'user created');
    } catch (err) {
      return error(res, 400, err.message, {});
    }
  },
  verify: async (req, res) => {
    return success(res, 200, 'OK');
  },
};
