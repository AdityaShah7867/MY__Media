import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: false,
    },
    location: {
        type: String,
        require: false,
    },
    desciprtion: String,
    picturepath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    },
    }, { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
