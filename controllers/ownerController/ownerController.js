const { to, TE, ReE, ReS } = require("../../services/util.service");
const models = require("../../models");
const ProductModel = models.product;
const OrderModel = models.order;

const addProduct = async function (req, res) {
    if (req.body.productId == undefined) {
      let err,prodData;
      let product = {};
      product.product_name = req.body.product_name;
      product.product_desc = req.body.product_desc;
      product.product_price = req.body.product_price;
      product.status = 1 //req.body.status;
      product.created_by = req.body.created_by;
      console.log(product);
      [err, prodData] = await to(ProductModel.create(product));
      console.log(prodData);
      return ReS(res, {
        message: "Product successfully Added.",
        data: prodData,
      });
    } else {
      
      let err, prodData;

      let product = {};
      product.product_name = req.body.product_name;
      product.product_desc = req.body.product_desc;
      product.product_price = req.body.product_price;
      product.status = 1 //req.body.status;
      product.created_by = req.body.created_by;
      product.modified_by = req.body.modified_by;
      [err, prodData] = await to(
        ProductModel.update(product, {
          where: { id: req.body.productId },
        })
      );
      return res.send({
        message: "Product Details successfully Updated.",
        data: prodData,
      });
    }
};
module.exports.addProduct = addProduct;


const getOrderList = async function (req, res) {
  let err, Order;
  [err, Order] = await to(
    OrderModel.findAll()
  );  
  if (err) return ReE(res, err);
  return ReS(res, { message: "Order List", OrderInfo: Order });
};
module.exports.getOrderList = getOrderList;
