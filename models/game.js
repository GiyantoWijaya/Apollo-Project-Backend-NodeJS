'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      game.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });
      game.hasMany(models.user_game_history, {
        foreignKey: 'id_game',
      });
    }
  }
  game.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
      isPlayed: DataTypes.BOOLEAN,
      play_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'game',
    }
  );
  return game;
};
