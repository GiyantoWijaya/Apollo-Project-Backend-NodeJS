const { user, game, user_game_history } = require('../models/');
const { success, error } = require('../utils/response/json.utils');

exports.index = async (req, res) => {
  try {
    const usersHistoryData = await user_game_history.findAll({
      include: [
        {
          model: user,
        },
        {
          model: game,
        },
      ],
      order: [['score', 'DESC']],
    });
    return success(res, 200, 'Success Get All Data from server', {
      usersHistoryData,
    });
  } catch (Error) {
    return error(res, 400, Error.message, 'Server Error');
  }
};

exports.show = async (req, res) => {
  const userId = req.params.id;
  const userData = await user_game_history.findOne({
    where: { user_id: userId },
  });

  try {
    if (userData) {
      return success(res, 200, 'Success Get Data', { userData });
    } else {
      return error(res, 400, 'User not found', 'NULL');
    }
  } catch (Error) {
    return error(res, 400, Error.message, 'Server Error');
  }
};

exports.create = async (req, res) => {
  const userId = req.params.id;
  const idGame = req.params.idgame;
  const { time, score } = req.body;
  const data = {
    time,
    score,
    user_id: userId,
    id_game: idGame,
  };
  const userExist = await user_game_history.findOne({
    where: { user_id: userId },
  });

  try {
    if (!userExist) {
      const userData = await user_game_history.create(data);
      return success(res, 200, 'Success Create Data', { userData });
    } else {
      const addScore = await user_game_history.update({ time, score }, { where: { user_id: userId } });
      return success(res, 200, 'Success Update Data', { addScore });
    }
  } catch (Error) {
    return error(res, 400, Error.message, 'Server Error');
  }
};
