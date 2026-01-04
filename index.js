const express = require('express');

const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);


app.listen(8080, () => console.log("Server running on port 3000"));
