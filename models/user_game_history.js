'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_history.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      user_game_history.belongsTo(models.game, {
        foreignKey: 'id_game',
        onDelete: 'CASCADE',
      });
    }
  }
  user_game_history.init(
    {
      time: DataTypes.STRING,
      score: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_game_history',
    }
  );
  return user_game_history;
};
