const mongoose = require('mongoose');
const schema = mongoose.Schema;

const notificationSchema = new schema({
  title: { type: String },
  question: { type: String },
  category: { type: schema.Types.ObjectId, ref: 'notificationcat' },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, required: true, default: false },
  is_active: { type: Boolean, required: true, default: true },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: Date.now },
});
module.exports = notification = mongoose.model('notification', notificationSchema);
