const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");

const rout = express.Router();

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/signup",
//     [
//       verifySignUp.checkDuplicateUsernameOrEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );

//   app.post("/signin", controller.signin);

//   app.post("/signout", controller.signout);
// };

rout.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

    rout.post("/signup",
        [
          verifySignUp.checkDuplicateUsernameOrEmail,
          // verifySignUp.checkRolesExisted
        ],
        controller.signup
      );

        rout.post("/signin", controller.signin);

    rout.post("/signout", controller.signout);

    module.exports = rout
