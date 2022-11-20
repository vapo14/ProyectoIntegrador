const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    guest_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    ts_created: {
      type: Date,
      required: true,
    },
    ts_updated: {
      type: Date,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    form_of_booking: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    number_of_adults: {
      type: String,
      required: true,
    },
    number_of_children: {
      type: String,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
  },
  { collection: "Reservations" }
);
userSchema.set("versionKey", false);

module.exports = mongoose.model("ReservationModel", userSchema);
