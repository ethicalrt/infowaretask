const { to, TE, ReE, ReS } = require("../../services/util.service");
const crypto = require("crypto");
const models = require("../../models");
const OrderModel = models.order;
const ProductModel = models.product;
const fs = require("fs");


var path = require("path");

const orderProduct = async function (req, res) {
    if (req.body.orderId == undefined) {
      let err, orderData;
      let order = {};
      order.ordered_product_name = req.body.ordered_product_name;
      order.ordered_product_desc = req.body.ordered_product_desc;
      order.ordered_product_price = req.body.ordered_product_price;
      order.ordered_product_id = req.body.ordered_product_id;
      order.status = 0;// req.body.status
      order.placed_by = req.body.placed_by;
      [err, orderData] = await to(OrderModel.create(order));
      return ReS(res, {
        message: "Order successfully Added.",
        data: orderData,
      });
    } else {
  
      let err, orderData;
     
      let order = {};
      order.ordered_product_name = req.body.ordered_product_name;
      order.ordered_product_desc = req.body.ordered_product_desc;
      order.ordered_product_price = req.body.ordered_product_price;
      order.ordered_product_id = req.body.ordered_product_id;
      order.status = 0;// req.body.status
      order.placed_by = req.body.placed_by;
      order.modified_by = req.body.modifiedBy;

      [err, orderData] = await to(
        OrderModel.update(order, {
          where: { id: req.body.orderId },
        })
      );
      return ReS(res, {
        message: "Order Details successfully Updated.",
        data: orderData,
      });
    }
  
    
};
module.exports.orderProduct = orderProduct;


const browseProducts = async function (req, res) {
  let err, product;
  [err, product] = await to(
    ProductModel.findAll()
  );
 
  if (err) return ReE(res, { message: "Oops something went wrong." });
  return ReS(res, { message: "Product list", productInfo: product });
};
module.exports.browseProducts = browseProducts;

const viewOrders = async function (req, res) {
  let err, order;
  [err, order] = await to(
    OrderModel.findAll({
      where: {
        placed_by: req.body.userId,
      },
    })
  );
 
  if (err) return ReE(res, { message: "Oops something went wrong." });
  return ReS(res, { message: "Order list", orderInfo: order });
};
module.exports.viewOrders = viewOrders;
