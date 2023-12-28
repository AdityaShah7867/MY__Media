import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE NEW POST
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturepath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId: req.body.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      description: req.body.description,
      picturepath: req.file.path,
      likes: {
        [req.body.userId]: true,
      },
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};


//GET ALL POSTS
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(error);
    }
}

//GET USER POST

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const posts = await Post.find({userId});
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(error);
    }
}

//HANDLE LIKES

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
       
        //Remove Like
        if (isLiked) {
            posts.likes.delete(userId);
        }
        //Add Like
        else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true} //get new object
        )

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json(error);
    }
}
