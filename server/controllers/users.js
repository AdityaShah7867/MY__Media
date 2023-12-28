import User from "../models/User";

//FETCH USER DETAILS
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json(err);
    }
}

// FETCH FRIENDS
export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // FORMAT DATA FOR FRONTEND
        const formattedFriends = friends.map(
             ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
             }
        )
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json(err);
    }
}

// THIS MIGHT NOT WORK BECAUSE I AM NOOB
// UPDATE FRIEND LIST
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);            
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        // FORMAT DATA FOR FRONTEND
        const formattedFriends = friends.map(
             ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
             }
        );

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(500).json(err);
    }
}   