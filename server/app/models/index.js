const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.Transaction = require("./User_Transaction")
db.leaverequests=require("./Leave.model")
db.ROLES = ["user", "admin", "moderator", "authoriser", "verifier"];

module.exports = db;