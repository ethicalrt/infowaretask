const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middleware/passport")(passport);
const endUserController = require("../controllers/endUserController/endUserController");
const userController = require("../controllers/endUserController/userController");
router.get("/", function (req, res, next) {
    res.json({
      status: "success",
      message: "Infoware End User",
      data: { version_number: "v1.0.0" },
    });
  });
  

router.post("/createAccount", userController.createAccount);
router.post("/login", userController.Login);
router.post("/browseProducts",  passport.authenticate("jwt", { session: false }), endUserController.browseProducts);
router.post("/orderProduct",  passport.authenticate("jwt", { session: false }), endUserController.orderProduct);
router.post("/viewOrders",  passport.authenticate("jwt", { session: false }), endUserController.viewOrders);



module.exports = router;
