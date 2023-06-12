const express = require("express");
const {
  index,
  show,
  create,
} = require("../controllers/userGameHistory.controller");

const gameHistoryRoutes = express.Router();

gameHistoryRoutes.get("/gamePlay", index);
gameHistoryRoutes.get("/gamePlay/:id", show);
gameHistoryRoutes.post("/gamePlay/:idgame/:id", create);

module.exports = gameHistoryRoutes;
