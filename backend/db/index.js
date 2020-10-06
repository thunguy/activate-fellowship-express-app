const path = require("path");
const { readFileSync } = require("fs");

const Model = require("./Model");

const initialDb = JSON.parse(readFileSync(path.join(__dirname, "db.json")));

module.exports = {
  Users: new Model("User", initialDb.Users),
  Groups: new Model("Group", initialDb.Groups),
  UserGroups: new Model("UserGroup", initialDb.UserGroups),
};
