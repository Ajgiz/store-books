const Router = require("express");
const router = new Router();
const {auth} = require("../middleware/auth");
const {checkAdmin}=require('../middleware/checkAdmin')

const BrandController = require("../controller/brand");
router.get("/", BrandController.getAll);
router.post("/", checkAdmin, BrandController.create);
module.exports = router;
