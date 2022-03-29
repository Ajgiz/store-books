const Router = require("express");
const router = new Router();
const brandRouter = require("./brand");
const deviceRouter = require("./device");
const userRouter = require("./user");
const typeRouter = require("./type");
const orderRouter = require("./order");

router.use("/user", userRouter);
router.use("/order", orderRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);

module.exports = router;
