const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRoutes = require('./routes/homeRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);

//  EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// soket
io.on('connection', socket => {
  console.log('A user connected');

  socket.on('message', data => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// 404 Page Not Found
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const PORT = process.env.PORT || 9999;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
