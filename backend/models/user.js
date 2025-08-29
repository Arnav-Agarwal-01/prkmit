const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String},
  hallticketno: { type: String, required: true, unique: true },
  parentphone: { type: String, required: true },
  currentyear : { type: Number},
  transactionid : { type: String},
  qrcode : { type: String},
  entry : { type: String},
},
{timestamps: true});

module.exports = mongoose.model('User', userSchema,'StudentDatabase');