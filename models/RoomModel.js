const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        room_number: {
            type: Number,
            required: true,
        },
        beds_type_number: {
            type: Number,
            required: true
        },
        current_price: {
            type: Number,
            required: true
        },
        jacuzzi: {
            type: Boolean,
            require: true,
        }
    },
    { collection: "Rooms"}
);
roomSchema.set("versionKey", false);

module.exports = mongoose.model("RoomModel", roomSchema);