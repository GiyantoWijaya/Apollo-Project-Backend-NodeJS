const { game } = require('../models');
const { success, error } = require('../utils/response/json.utils');

async function gameList(req, res) {
  try {
    const game_list = await game.findAll({});
    if (game_list) {
      return success(res, 200, 'Success Get Data', { game_list });
    } else {
      return error(res, 400, 'Error', 'NULL');
    }
  } catch (Error) {
    return error(res, 400, Error.message, 'Server Error');
  }
}

async function createGame(req, res) {
  const { name, description, thumbnail_url, isPlayed, play_count } = req.body;
  try {
    let create = await game.create({
      name,
      description,
      thumbnail_url,
      isPlayed,
      play_count,
    });
    return success(res, 200, 'Data Create Successfully', create);
  } catch (error) {
    return error(res, 400, Error.message, 'Server Error');
  }
}

async function updateGame(req, res) {
  const idGame = req.params.idGame;
  // const { isPlayed } = req.body;
  let newData = {
    isPlayed: req.body.isPlayed,
  };

  try {
    let update = await game.update(newData, {
      where: { id: idGame },
    });
    return success(res, 200, 'Data Changed Successfully', newData);
  } catch (error) {
    return error(res, 400, Error.message, 'Server Error');
  }
}

module.exports = { gameList, createGame, updateGame };
