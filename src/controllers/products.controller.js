import * as productsService from "../service/products.service.js";

//--->GET /api/products/getProducts
export const getProducts = async (req, res) => {
  try {
    const products = await productsService.findAlls();
    //res.status(201).json(products);
    res.status(201).render("products/listProducts", { products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//--->POST /api/products/postProducts
export const createProduct = async (req, res) => {
  const { title, description, price, stock, code, category } = req.body;
  if (!title || !description || !price || !stock || !code || !category) {
    return res.status(400).json({ message: "Some data is missing" }); //lo que me muestra en response
  }
  try {
    const newProduct = await productsService.create(req.body); //lo que manda en req(pedido) como obj a service
    //res.status(200).json(newProduct); //lo que me muestra en response
    res.status(200).redirect("/api/homeProfile");
  } catch (error) {
    res.status(500).json({ error }); //lo que me muestra en response
  }
};

//--->GET /api/products/:pid
export const getProductById = async (req, res) => {
  try {
    const product = await productsService.findById(req.params.pid);
    if (!product) {
      res.status(200).json({ message: "Invalid ID" });
    } else {
      res.status(201).render("products/detailsProduct", { product });
      //res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

//--->PUT /api/products/:pid y req.body
export const updateProduct = async (req, res) => {
  try {
    const product = await productsService.update(req.params.pid, req.body);
    res.status(201).render("products/detailsProduct", { product });
    //res.status(200).json(productUpdated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

//--->DELETE /api/products/:pid
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productsService.deleted(req.params.pid);
    //res.status(200).json({ message: "Product Delete", product: deleteProduct });
    res.status(200).redirect("/api/homeProfile");
  } catch (error) {
    res.status(500).json({ error });
  }
};
