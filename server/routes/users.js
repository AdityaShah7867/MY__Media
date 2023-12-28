import express from "express";
import{ 
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET USER DETAILS
router.get("/:id", verifyToken, getUser);
router.get("/:Id/friends", verifyToken, getUserFriends);

//UPDATE FRIEND LIST
router.patch("/:id/friendId", verifyToken, addRemoveFriend);

export default router;