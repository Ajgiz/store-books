const Router = require("express");
const router = new Router();
const OrderController = require("../controller/order");
const { auth } = require("../middleware/auth");

router.post("/", auth, OrderController.createOrder);
router.get("/basket", auth, OrderController.getAll);
router.put("/addOneProduct", auth, OrderController.addOneProduct);
router.put("/removeOneProduct", auth, OrderController.removeOneProduct);
router.delete("/", auth, OrderController.deleteOrder);
router.delete("/reset", auth, OrderController.resetOrders);
module.exports = router;
