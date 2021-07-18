const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../middleware/passport")(passport);

const ownerController = require("../controllers/ownerController/ownerController");
const userController = require("../controllers/ownerController/userController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    status: "success",
    message: "Infoware Owner",
    data: { version_number: "v1.0.0" },
  });
});

router.post("/addAccount", passport.authenticate("jwt", { session: false }),  userController.createAccount);
router.post("/addProduct", passport.authenticate("jwt", { session: false }), ownerController.addProduct);
router.post("/viewOrders", passport.authenticate("jwt", { session: false }),  ownerController.getOrderList);
module.exports = router;
