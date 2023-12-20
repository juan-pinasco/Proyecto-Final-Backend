import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
  async findAll() {
    try {
      const allProducts = await productsModel.find();
      return allProducts;
    } catch (error) {
      return error;
    }
  }

  async createProduct(obj) {
    //esta linea es la viene de service
    try {
      const newProduct = productsModel(obj); //esta linea es el que va hacia model para comparar modelo con datos pasados
      const productSave = await newProduct.save(); //esta linea es la que guarda en mongo
      return productSave;
    } catch (error) {
      return error;
    }
  }

  async findId(_id) {
    try {
      const product = await productsModel.findById(_id);
      return product;
    } catch (error) {
      return error;
    }
  }

  async updateOne(id, obj) {
    try {
      /* const response = await productsModel.updateOne({ _id: id }, { ...obj }); */
      const response = await productsModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteOne(id) {
    try {
      const response = await productsModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export const productsManager = new ProductsManager();
