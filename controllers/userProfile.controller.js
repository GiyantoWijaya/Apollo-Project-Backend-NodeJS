const { user_profile } = require("../models/");
const { success, error } = require("../utils/response/json.utils");

module.exports = {
  index: async (req, res) => {
    // let whereQuery = req.user.isAdmin ? {} : { id: req.user.id };

    let orderQuery = [
      ["updatedAt", "desc"],
      ["createdAt", "desc"],
    ];

    // let includeQuery = [{ model: user_games_biodata }, { model: user_games_history }];

    try {
      user_profile
        .findAll({
          order: orderQuery,
        })
        .then((userProfile) => {
          return success(res, 200, "user profile", userProfile);
        });
    } catch (error) {
      return error(res, 400, Error.message, "Server Error");
    }
  },

  create: async (req, res) => {
    try {
      let userProfile = await user_profile.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        city: req.body.city,
        social_media_url: req.body.social_media_url,
      });

      return success(res, 200, "Data Deleted Successfully", userProfile);
    } catch (Error) {
      return error(res, 400, Error.message, "Server Error");
    }
  },

  show: async (req, res) => {
    const userId = req.params.id;
    const dataProfile = await user_profile.findOne({
      where: { user_id: userId },
    });
    const newData = {
      firstname: "",
      lastname: "",
      bio: "",
      city: "",
      social_media_url: "",
      user_id: userId,
    };

    try {
      if (!dataProfile) {
        const createUserProfile = await user_profile.create(newData);
        return success(res, 200, "Success Get Data", { createUserProfile });
      } else {
        return success(res, 200, "Success Get Data", { dataProfile });
      }
    } catch (Error) {
      return error(res, 400, Error.message, "Server Error");
    }
  },

  updates: async (req, res) => {
    const userId = req.params.id;

    try {
      let newData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        city: req.body.city,
        social_media_url: req.body.social_media_url,
      };
      let userProfile = await user_profile.update(newData, {
        where: { user_id: userId },
      });

      return success(res, 200, "Data Changed Successfully", newData);
    } catch (Error) {
      return error(res, 400, Error.message, "Server Error");
    }
  },

  deletes: async (req, res) => {
    try {
      let erase = await user_profile.destroy({ where: { id: req.params.id } });

      if (erase > 0) {
        return success(res, 200, "Data Deleted Successfully");
      } else {
        return error(res, 400, "Error Deleting Profile");
      }
    } catch (Error) {
      return error(res, 400, Error.message, "Server Error");
    }
  },
};
