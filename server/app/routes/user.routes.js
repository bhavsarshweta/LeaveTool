const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require("express")
const rout = express.Router();

// const userController = require("../controllers/user.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  
};




  rout.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.Userstore);

  // app.get("/api/test/user", [authJwt.verifyToken], controller.Usershow);

  rout.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  rout.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


// rout.post('/store', userController)

rout.post("/api/test/userstore", [authJwt.verifyToken], controller.Userstore);

rout.get("/api/test/GetUserData", [authJwt.verifyToken], controller.GetUserData);

//rout.get("/api/test/SpecificTransaction/:id", [authJwt.verifyToken], controller.FindSpecificTransaction);

//rout.get("/api/test/UpdateTransactionDetails/:id", [authJwt.verifyToken], controller.UpdateTransactionDetails);

//rout.get("/api/test/DeleteTransaction/:id", [authJwt.verifyToken], controller.DeleteTransaction);




rout.get("/api/test/SpecificUser/:empId", controller.FindSpecificUser);
rout.get('/api/getHistory/:id',controller.GetUserLeaveHistory);
rout.get('/api/getHistory',controller.FindAllLeaves);
rout.get('/api/getApprovedLeaves',controller.FindApprovedLeaves);
rout.get('/api/getPendingLeaves',controller.FindPendingLeaves);
rout.get('/api/getDeclinedLeaves',controller.FindDeclinedLeaves);
rout.post('/api/addleave/:id',controller.addLeaveRequest);
rout.patch('/update/:id',controller.UpdateUserDetails);
rout.patch('/updateLeave/:id',controller.UpdateLeaveDetails);
rout.delete("/api/test/DeleteLeave/:id", controller.DeleteLeaveRequest);
rout.patch('/api/leave-requests/:id',controller.actionOnLeaveRequest);



module.exports = rout;