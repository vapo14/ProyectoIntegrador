const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    room_number: {
      type: Number,
      required: true,
    },
    beds_type: {
      type: String,
      required: true,
    },
    current_price: {
      type: Number,
      required: true,
    },
    jacuzzi: {
      type: Boolean,
      required: true,
    },
  },
  { collection: 'Rooms' }
);
roomSchema.set('versionKey', false);

module.exports = mongoose.model('RoomModel', roomSchema);
