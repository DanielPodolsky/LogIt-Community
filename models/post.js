import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  body: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tags: {
    type: [mongoose.Schema.Types.ObjectID],
    ref: "Tag",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
