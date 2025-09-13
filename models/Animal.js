const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    species: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, default: 0 },
    isEndangered: { type: Boolean, default: false },
    image: {
      type: String,
      trim: true,
      default:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop"
    },
    description: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Animal", animalSchema);
