const router = require("express").Router();
const { Users, UserGroups } = require("./db");
const _ = require("lodash");

router.get("/", async (req, res, next) => {
  try {
    if (req.query.groupId) {
      const userGroups = await UserGroups.findAll({groupId: Number(req.query.groupId)});
      const users = await Promise.all(userGroups.map((userGroup) => Users.find({id: userGroup.userId})));
      res.json(users.map((user) => _.pick(user, ["id", "name", "isActivated"])));
    } else {
      const users = await Users.findAll();
      res.json(users.map((user) => _.pick(user, ["id", "name", "isActivated"])));
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const users = await Promise.all(req.body.map((user) => Users.find({id: user.id})));
    const bannedUsers = users.filter((user) => user.isBanned);

    if (bannedUsers.length !== 0)
      return res.status(422).json({
        "code": "BANNED_USERS",
        "message": "Cannot patch banned users.",
        "banned_users": bannedUsers
      });

    const results = await Promise.all(users.map((user) => {
      return user.update(req.body.find((change) => user.id === change.id));
    }));

    return res.json(results.map((result) => _.pick(result, ["id", "name", "isActivated"])));
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
