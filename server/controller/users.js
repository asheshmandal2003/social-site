import User from "../models/User.js"

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastName, occupation, location, picturePath }) => {
        return { _id, firstname, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const userFriend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      userFriend.friends = userFriend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      userFriend.friends.push(id);
    }
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriend = friends.map(
      ({ _id, firstname, lastName, occupation, location, picturePath }) => {
        return { _id, firstname, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriend);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
