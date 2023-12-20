import { productsManager } from "../DAL/daos/products.manager.js";

export const findAlls = async () => {
  const products = await productsManager.findAll();
  return products;
};

export const create = async (obj) => {
  //"create"--> viene de controller
  //console.log(obj); //(obj)--> hace referncia a req(pedido) de controller
  const product = await productsManager.createProduct(obj); //"createProduct"--> va hacia manager
  return product;
};

export const findById = async (_id) => {
  const product = await productsManager.findId(_id);
  return product;
};

export const update = async (id, obj) => {
  /* const product = await productsManager.updateOne({ _id: id }, { ...obj }); */
  const product = await productsManager.updateOne(id, obj);
  return product;
};

export const deleted = async (id) => {
  const response = await productsManager.deleteOne(id);
  return response;
};
