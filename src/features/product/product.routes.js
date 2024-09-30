//manage routes/paths to product contorller

//1.import express
import express from "express";
import { ProductController } from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleare.js";

//2. initialize express router
const productRouter = express.Router();

const productController = new ProductController();
// All the paths to controller methods.
// localhost/api/products

//all the path to controller methods
productRouter.get("/filter", (req, res) =>{
  productController.filterProducts(req, res)
});

productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});

productRouter.post("/rate", 
  (req, res,next) => {
    productController.rateProduct(req, res,next);
  });
export default productRouter;


