import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friends";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getfriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getfriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={"500"}
        sx={{ mb: "1.5rem" }}
      >
        Friend List
        <Box display={"flex"} flexDirection="column" gap={"1.5rem"}>
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.location}
              userPicturepath={friend.picturePath}
            />
          ))}
        </Box>
      </Typography>
    </WidgetWrapper>
  );
};
export default FriendListWidget;
