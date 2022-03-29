const Router = require("express");
const router = new Router();
const UserController = require("../controller/user");
const { body } = require("express-validator");

router.post("/logout", UserController.logout);
router.get("/", UserController.getOne);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ max: 128, min: 6 }),
  UserController.registration
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ max: 128, min: 6 }),
  UserController.login
);
router.get("/activate/:id", UserController.activate);
router.get("/refresh", UserController.refresh);

module.exports = router;
