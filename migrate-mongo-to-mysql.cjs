/**
 * FISORA - MongoDB to MySQL Data Migration Script
 * 
 * Run: node migrate-mongo-to-mysql.js
 * 
 * Prerequisites:
 *   npm install mongoose mysql2
 * 
 * This script:
 *  1. Connects to MongoDB Atlas and reads all Products, Orders, Users
 *  2. Inserts them into the MySQL fisora_db database
 */

const mongoose = require('mongoose');
const mysql = require('mysql2/promise');

// ─── Config ────────────────────────────────────────────────────────────────────
const MONGO_URI = 'mongodb+srv://abdennourbouhounali_db_user:I110P9aIzi1Pc5Wg@maison-el-oula.mwc4qxi.mongodb.net/?appName=maison-el-oula';

const MYSQL_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'debian-sys-maint',
  password: 'ADEyqoPRMsQqSxry',
  database: 'fisora_db',
};

// ─── MongoDB Schemas ───────────────────────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  images: [String],
  weight: String,
  isActive: { type: Boolean, default: true },
  tags: [String],
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  address: String,
  city: String,
  wilaya: String,
  postalCode: String,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    productPrice: Number,
    quantity: Number,
  }],
  subtotal: Number,
  shippingFee: { type: Number, default: 0 },
  total: Number,
  status: { type: String, default: 'pending' },
  paymentMethod: { type: String, default: 'cash_on_delivery' },
  notes: String,
  orderNumber: String,
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

// ─── Main Migration ────────────────────────────────────────────────────────────
async function migrate() {
  console.log('🔌 Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected.');

  const Product = mongoose.model('Product', ProductSchema);
  const Order = mongoose.model('Order', OrderSchema);
  const User = mongoose.model('User', UserSchema);

  console.log('🔌 Connecting to MySQL...');
  const db = await mysql.createConnection(MYSQL_CONFIG);
  console.log('✅ MySQL connected.');

  // ── Migrate Users ──────────────────────────────────────────────────────────
  const users = await User.find({});
  console.log(`📦 Migrating ${users.length} users...`);
  const userIdMap = {}; // mongo _id -> mysql id

  for (const user of users) {
    const [result] = await db.execute(
      `INSERT IGNORE INTO users (name, email, password, is_admin, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.name || 'Unknown',
        user.email,
        user.password || '$2y$12$placeholder_hashed_password',
        user.isAdmin ? 1 : 0,
        user.createdAt || new Date(),
        user.updatedAt || new Date(),
      ]
    );
    userIdMap[user._id.toString()] = result.insertId;
  }
  console.log(`✅ ${users.length} users migrated.`);

  // ── Migrate Products ───────────────────────────────────────────────────────
  const products = await Product.find({});
  console.log(`📦 Migrating ${products.length} products...`);
  const productIdMap = {}; // mongo _id -> mysql id

  for (const product of products) {
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const [result] = await db.execute(
      `INSERT INTO products (name, description, price, stock, category, slug, images, weight, is_active, tags, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.name,
        product.description || null,
        product.price || 0,
        product.stock || 0,
        product.category || 'general',
        slug,
        JSON.stringify(product.images || []),
        product.weight || null,
        product.isActive !== false ? 1 : 0,
        JSON.stringify(product.tags || []),
        product.createdAt || new Date(),
        product.updatedAt || new Date(),
      ]
    );
    productIdMap[product._id.toString()] = result.insertId;
  }
  console.log(`✅ ${products.length} products migrated.`);

  // ── Migrate Orders ─────────────────────────────────────────────────────────
  const orders = await Order.find({});
  console.log(`📦 Migrating ${orders.length} orders...`);

  for (const order of orders) {
    const [orderResult] = await db.execute(
      `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone,
        address, city, wilaya, postal_code, subtotal, shipping_fee, total,
        status, payment_method, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order.orderNumber || `FSR-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
        order.customerName || 'Unknown',
        order.customerEmail || 'unknown@example.com',
        order.customerPhone || '',
        order.address || '',
        order.city || '',
        order.wilaya || '',
        order.postalCode || null,
        order.subtotal || 0,
        order.shippingFee || 0,
        order.total || 0,
        order.status || 'pending',
        order.paymentMethod || 'cash_on_delivery',
        order.notes || null,
        order.createdAt || new Date(),
        order.updatedAt || new Date(),
      ]
    );

    const mysqlOrderId = orderResult.insertId;

    // Insert order items
    for (const item of (order.items || [])) {
      const mysqlProductId = productIdMap[item.product?.toString()] || null;
      if (!mysqlProductId && !item.productName) continue;

      await db.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          mysqlOrderId,
          mysqlProductId,
          item.productName || 'Unknown Product',
          item.productPrice || 0,
          item.quantity || 1,
          (item.productPrice || 0) * (item.quantity || 1),
        ]
      );
    }
  }
  console.log(`✅ ${orders.length} orders migrated.`);

  await db.end();
  await mongoose.disconnect();
  console.log('\n🎉 Migration complete! All data is now in MySQL.');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
