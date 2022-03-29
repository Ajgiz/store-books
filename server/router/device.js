const Router = require("express");
const router = new Router();
const {checkAdmin}=require('../middleware/checkAdmin')
const DeviceController = require("../controller/device");
router.get("/", DeviceController.getFilterDevices);
router.get("/:id", DeviceController.getOne);
router.post("/", checkAdmin, DeviceController.create);
router.put("/:id",checkAdmin, DeviceController.update);
router.delete("/:id",checkAdmin, DeviceController.delete);
module.exports = router;
