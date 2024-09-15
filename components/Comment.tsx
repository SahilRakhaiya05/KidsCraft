import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";

const Comment = (props) => {
  const { comment, date, isSeller } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSeller ? "#a881af" : "#000",
        },
      ]}
    >
      {isSeller && (
        <Image
          source={require("../assets/images/kid.png")}
          style={styles.kidImage}
        />
      )}

      <View style={styles.commentInfo}>
        <Text style={styles.comment}>{comment}</Text>

        <Text style={styles.date}>{moment(date).format("lll")}</Text>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd", // Add border color for better visibility
    backgroundColor: "#a881af", // Set a default background color
    marginBottom: 10, // Add margin bottom for spacing between comments
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
  },
  kidImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10, // Add margin to the right for spacing
  },
  commentInfo: {
    flex: 1,
  },
  comment: {
    fontSize: 13,
    fontFamily: "Neo",
    color: "#FFFFFF", // Adjusted text color
  },
  date: {
    fontSize: 10,
    fontFamily: "Neo",
    alignSelf: "flex-end",
    color: "#FFFFFF", // Adjusted text color
  },
});
