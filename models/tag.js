import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
