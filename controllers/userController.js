const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findOne: function (req, res) {
    db.User
      .findOne({
        user: req.body.user
      })
      .then(dbModel => {
        async function main() {
          var isTrue = await db.User.schema.methods.comparePassword(req.body.password, dbModel.password)
          if (isTrue) {
            let user = dbModel.toObject()
            delete user.password
            res.json(user)
          } else {
            res.json("We don't regognize the email or password")
          }

        }
        main()
      })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User
      .findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: req.body
      }, {
        new: true
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};