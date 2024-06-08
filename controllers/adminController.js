const fileHandler = require('../utils/fileHandler');

exports.getAdmin = (req, res) => {
  const products = fileHandler.readJSONFile('products.json');
  res.render('admin', { products });
};

exports.addProduct = (req, res) => {
  const { name, description, price, stock } = req.body;
  const photo = req.file ? req.file.filename : null;
  const products = fileHandler.readJSONFile('products.json');

  const newProductId = products.length + 1;

  // create new product object
  const newProduct = {
    id: `${Date.now()}`,
    name,
    description,
    price,
    stock,
    photo,
  };

  // Add the new product
  products.push(newProduct);

  //  updated products
  fileHandler.writeJSONFile('products.json', products);

  res.redirect('/admin');
};

exports.updateProduct = (req, res) => {
  const { id, name, description, price, stock } = req.body;
  const photo = req.file ? req.file.filename : null;
  const products = fileHandler.readJSONFile('products.json');

  // Find  product by ID
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products[productIndex].name = name;
    products[productIndex].description = description;
    products[productIndex].price = price;
    products[productIndex].stock = stock;
    if (photo) {
      products[productIndex].photo = photo;
    }

    // Write the updated products array
    fileHandler.writeJSONFile('products.json', products);
  }

  res.redirect('/admin');
};

exports.deleteProduct = (req, res) => {
  const productId = req.body.productId;
  let products = fileHandler.readJSONFile('products.json');

  // Remove the product
  products = products.filter(p => p.id !== productId);

  //update products array to the JSON file
  fileHandler.writeJSONFile('products.json', products);

  res.redirect('/admin');
};
