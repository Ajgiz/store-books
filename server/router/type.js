const Router = require("express");
const router = new Router();
const {auth} = require("../middleware/auth");
const {checkAdmin}=require('../middleware/checkAdmin')
const TypeController = require("../controller/type");
router.get("/", TypeController.getAll);
router.post("/", checkAdmin, TypeController.create);
module.exports = router;
