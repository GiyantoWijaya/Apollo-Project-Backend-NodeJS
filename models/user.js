'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.user_profile, {
        foreignKey: 'user_id',
      });
      user.hasMany(models.user_game_history, {
        foreignKey: 'user_id',
      });
      user.hasMany(models.game, {
        foreignKey: 'user_id',
      });
    }
  }
  user.init(
    {
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: true,
          isUnique: (value, next) => {
            user
              .findAll({
                where: {
                  username: value,
                },
              })
              .then((user) => {
                if (user.length != 0) {
                  next(new Error('username already in use'));
                }
                next();
              });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        alloNull: false,
      },
      isAdmin: DataTypes.BOOLEAN,
      isDelete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );

  user.addHook('afterValidate', async (user, options) => {
    const salt = await bcrypt.genSaltSync();

    user.password = await bcrypt.hashSync(user.password, salt);
  });

  user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  user.prototype.generateToken = function () {
    const payload = {
      id: this.id,
      username: this.username,
      isAdmin: this.isAdmin,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1 day',
    });

    return token;
  };

  return user;
};
