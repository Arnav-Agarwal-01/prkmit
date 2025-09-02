const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const sampleUsers = [
  {
    firstname: 'Rahul',
    hallticketno: '21BD1A0501',
    parentphone: '9876543210',
    currentyear: 1,
    transactionid: null,
    qrcode: null,
    entry: 'null'
  },
  {
    firstname: 'Priya',
    hallticketno: '22BD1A0502',
    parentphone: '9876543211',
    currentyear: 2,
    transactionid: 'TXN789012',
    qrcode: 'encrypted-qr-data-for-priya',
    entry: 'approved'
  },
  {
    firstname: 'Ankit',
    hallticketno: '20BD1A0503',
    parentphone: '9876543212',
    currentyear: 4,
    transactionid: null,
    qrcode: null,
    entry: null
  },
  {
    firstname: 'Sneha',
    hallticketno: '23BD1A0504',
    parentphone: '9876543213',
    currentyear: 1,
    transactionid: 'TXN345678',
    qrcode: 'encrypted-qr-data-for-sneha',
    entry: 'rejected'
  },
  {
    firstname: 'Arjun',
    hallticketno: '21BD1A0505',
    parentphone: '9876543214',
    currentyear: 3,
    transactionid: 'TXN901234',
    qrcode: 'encrypted-qr-data-for-arjun',
    entry: 'approved'
  }
];

async function seed() {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');
    
    // Insert sample users
    const users = await User.insertMany(sampleUsers);
    console.log(`Inserted ${users.length} sample users`);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

seed();