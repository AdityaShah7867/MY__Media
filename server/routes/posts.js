import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

//GET ALL POSTS EXISTING IN THE DATABASE
router.get("/", verifyToken, getFeedPosts);

//GET ALL POSTS OF A SPECIFIC USER
router.get("/:userId/post", verifyToken, getUserPosts);

//UPDATE POST DETAILS
router.patch("/:id/like", verifyToken, likePost);

export default router;