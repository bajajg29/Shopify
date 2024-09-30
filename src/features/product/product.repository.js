import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error_handler/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      //1.get db
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("OOPSYY!! Something went wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("OOPSYY!! Something went wrong", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("OOPSYY!! Something went wrong", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //to filter data we will be using find function of mongodb and for this we have to give expression and thats what we will be building
      //mongodb has its own set of operator

      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }

      return collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("OOPSYY!! Something went wrong", 500);
    }
  }

  // async rateProduct(userID, productID, rating){
  //       try{
  //           const db = getDB();
  //           const collection = db.collection(this.collection);
  //           // 1. Find the product
  //           const product = await collection.findOne({_id:new ObjectId(productID)})
  //           // 2. Find the rating

  //           const userRating = await product?.ratings?.find(r=>r.userID==userID);
  //           if(userRating){
  //           // 3. Update the rating
  //           await collection.updateOne({
  //               _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
  //           },{
  //               $set:{
  //                   "ratings.$.rating":rating
  //               }
  //           }
  //           );
  //           }else{
  //               await collection.updateOne({
  //                   _id:new ObjectId(productID)
  //               },{
  //                   $push: {ratings: {userID:new ObjectId(userID), rating}}
  //               })
  //           }
  //       }catch(err){
  //           console.log(err);
  //           throw new ApplicationError("OOPSYY!! Something went wrong", 500);
  //       }
  //   }

  async rateProduct(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //1.removes existing entry
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $pull: { ratings: { userID: new ObjectId(userID) } },
        }
      );

      //2.add new entry
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $push: { ratings: { userID: new ObjectId(userID), rating } },
        }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("OOPSYY!! Something went wrong", 500);
    }
  }
}

export default ProductRepository;
