import { Router } from "express";
import Post from "../models/post.js";
import purify from "../utils/sanitize.js";
import { postValidation, updatePostValidation } from "../validation/post.js";
import { verifyToken, isAdmin } from "../utils/token.js";

const router = Router();

// Get all posts
// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}); // Will find all posts
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting posts");
  }
});

// Get user's own posts
// GET /api/posts/me
router.get("/me", [verifyToken], async (req, res) => {
  try {
    console.log(req.user);
    const userPosts = await Post.find({ author: req.user.id }); // Will find posts created by the user
    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting user's posts");
  }
});

// Get posts by tags_ids
// GET /api/posts/tags?tags=id1, id2, id3
router.get("/tags", [verifyToken], async (req, res) => {
  try {
    console.log(typeof req.query.tags);
    const tags = req.query.tags.split(",").map((tag) => tag.trim());
    const posts = await Post.find({ tags: { $all: tags } });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with getting posts by tags");
  }
});

// Create a new post
// POST /api/posts/
router.post("/", [verifyToken], async (req, res) => {
  // 1. Sanitize
  Object.keys(req.body).forEach((key) => {
    if (Array.isArray(req.body[key])) {
      req.body[key] = req.body[key].map((item) => purify.sanitize(item));
    } else {
      req.body[key] = purify.sanitize(req.body[key]); // Sanitize the value only if it's not an array
    }
  }); // Sanitize each key

  // 2. Validate
  const { error } = postValidation.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // 3. Move on with the post creation
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with creating a new post");
  }
});

// Update user's own posts
// PATCH /api/posts/:id
router.patch("/:id", [verifyToken], async (req, res) => {
  // 1. Sanitize
  Object.keys(req.body).forEach((key) => {
    if (Array.isArray(req.body[key])) {
      req.body[key] = req.body[key].map((item) => purify.sanitize(item));
    } else {
      req.body[key] = purify.sanitize(req.body[key]); // Sanitize the value only if it's not an array
    }
  });

  // 2. Validate
  const { error } = updatePostValidation.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // 3. Update the post only if it belongs to the current user
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      req.body,
      { new: true } // Return the updated document
    );
    if (!updatedPost)
      return res
        .status(404)
        .json("Post not found or you don't have permission to update it");
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with updating the post");
  }
});

// Delete user's own posts
router.delete("/:id", [verifyToken], async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });
    if (!deletedPost)
      return res
        .status(404)
        .json("Post not found or you don't have permission to delete it");
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong with deleting the post");
  }
});

export default router;
