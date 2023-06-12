'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_profile.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
    }
  }
  user_profile.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      bio: DataTypes.STRING,
      city: DataTypes.STRING,
      social_media_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_profile',
    }
  );
  return user_profile;
};
