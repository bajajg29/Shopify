import { ApplicationError } from "../../error_handler/applicationError.js";
import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor( name, desc,imageUrl, category,price, sizes,id) { 
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
    this._id = id;
  }

  // static add(product) {
  //   product.id = products.length + 1;
  //   products.push(product);
  //   return product;
  // }

  // static get(id) {
  //   const product = products.find((i) => i.id == id);
  //   return product;
  // }

  // static getAll() {
  //   return products;
  // }

  // static filter(minPrice, maxPrice, category) {
  //   const result = products.filter((product) => {
  //     return (
  //       (!minPrice || product.price >= minPrice) &&
  //       (!maxPrice || product.price <= maxPrice) &&
  //       (!category || product.category === category)
  //     );
  //   });
  //   return result;
  // }


  static rateProduct(userID, productID, rating) {
    //1.validate user and product
   const user= UserModel.getAll().find((u) => u.id == userID);
    if (!user) {
      //user-defined error
    throw new ApplicationError( "User not found",404);
    }

    //validate for product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError( "Product not found",400);
    }

    //2. check if there are any ratings and if not then add ratings array
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userID: userID, rating: rating });
    }else{
      //3.check if user rating is already available.
      const existingRatingIndex=product.ratings.findIndex((r)=>r.userID==userID);
      if(existingRatingIndex==0){
        product.ratings[existingRatingIndex]={
          userID:userID,
          rating:rating,
        };
      }else{
        //4.if not existing rating add new rating
        product.ratings.push({
          userID:userID,
          rating:rating,
        });
      }
    }

  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1",
    19.99
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    29.99,
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    39.99,
    ["M", "XL", "S"]
  ),
];
