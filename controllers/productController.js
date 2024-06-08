const fileHandler = require('../utils/fileHandler');

exports.getProducts = (req, res) => {
  const products = fileHandler.readJSONFile('products.json');
  res.render('products', { products });
};

exports.getProductDetails = (req, res) => {
  const productId = req.params.id;
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find(p => p.id === productId);

  if (product) {
    res.render('productDetails', { product });
  } else {
    res.status(404).render('404', { pageTitle: 'Product Not Found' });
  }
};

exports.addToCart = (req, res) => {
  const productId = req.body.productId;
  let cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find(p => p.id === productId);

  if (product) {
    if (product.stock > 0) {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity += 1;
        // Update   price
        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      } else {
        cart.push({
          productId,
          quantity: 1,
          price: product.price,
          totalPrice: product.price,
        });
      }

      product.stock -= 1;
      fileHandler.writeJSONFile('products.json', products);
      fileHandler.writeJSONFile('cart.json', cart);
    } else {
      console.log(`Product with ID ${productId} out of stock.`);
    }
  } else {
    console.log(`Product with ID ${productId} not found.`);
  }

  res.redirect('/products#proSec');
};

exports.increseCart = (req, res) => {
  const productId = req.body.productId;
  let cart = fileHandler.readJSONFile('cart.json');
  const products = fileHandler.readJSONFile('products.json');
  const product = products.find(p => p.id === productId);

  if (product) {
    if (product.stock > 0) {
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity += 1;

        cartItem.totalPrice = cartItem.price * cartItem.quantity;
      } else {
        cart.push({
          productId,
          quantity: 1,
          price: product.price,
          totalPrice: product.price,
        });
      }

      // Update the product stock
      product.stock -= 1;
      fileHandler.writeJSONFile('products.json', products);
      fileHandler.writeJSONFile('cart.json', cart);
    } else {
      console.log(`Product with ID ${productId} out of stock.`);
    }
  } else {
    console.log(`Product with ID ${productId} not found.`);
  }

  res.redirect('/cart');
};
