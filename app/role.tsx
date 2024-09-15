import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const RoleScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Who are you?</Text>

      <View style={styles.btnContainer}>
        <CustomButton
          text="buyer"
          backgroundColor="#5dbea3"
          onPress={() => router.push("/(tabs)")}
        />
        <CustomButton
          text="seller"
          backgroundColor="#a881af"
          onPress={() => router.push("/login")}
        />
      </View>
    </View>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  heading: {
    fontSize: 30,
    textTransform: "capitalize",
    fontFamily: "Neo",
    marginTop: 20, 
  },
  btnContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 30,
  },
  logo: {
    width: 200, 
    height: 200, 
    marginTop: 10, 
  },
});
