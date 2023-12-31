const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.route('/')
    .post(orderController.createOrder)

router.route('/:seller_id')
    .get(orderController.getAllOrder)
    
router.route('/orderList/:cafe_id')
    .get(orderController.getOrderDetailForSeller)

router.route('/orderListSeller/:cafe_id/:order_id')
    .get(orderController.getOrderDetailForSeller2)

router.route('/:order_id')
    .get(orderController.getOrderById)
    .patch(orderController.orderCompleted)
    .delete(orderController.cancelOrder)

router.route('/orderHistory/:customer_id')
    .get(orderController.getAllOrderByCustId)

router.route('/orderReceipt/:order_id')
    .get(orderController.getOrderDetailReceipt);

router.route('/pending/:customer_id')
    .get(orderController.getOrderPending)

router.route('/confirmOrder')
    .post(orderController.confirmOrder)

module.exports = router