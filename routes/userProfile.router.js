const express = require("express");
const {
  index,
  create,
  show,
  updates,
  deletes,
} = require("../controllers/userProfile.controller");

const userProfileRoutes = express.Router();

userProfileRoutes.get("/userProfile/index", index);
userProfileRoutes.get("/userProfile/show/:id", show);
userProfileRoutes.post("/userProfile/create", create);
userProfileRoutes.put("/userProfile/update/:id", updates);
userProfileRoutes.delete("/userProfile/delete/:id", deletes);

module.exports = userProfileRoutes;
