const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "UserRoles" }
);
userSchema.set("versionKey", false);

module.exports = mongoose.model("UserRoles", userSchema);
