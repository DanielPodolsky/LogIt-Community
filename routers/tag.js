import { Router } from "express";
import Tag from "../models/tag.js";
import purify from "../utils/sanitize.js";
import { tagValidation } from "../validation/tag.js";
import { verifyToken, isAdmin } from "../utils/token.js";
const router = Router();

// Create a new tag
// POST /api/tags
// Admins Only
router.post("/", [verifyToken, isAdmin], async (req, res) => {
  // 1. Sanitize
  req.body.name = purify.sanitize(req.body.name);

  // 2. Validate
  const { error } = tagValidation.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // 3. Move on with the creation

  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong with creating a new tag" });
  }
});

export default router;
