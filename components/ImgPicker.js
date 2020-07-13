import React from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const verifyPermissions = async () => {
    const result = await Camera.requestPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant camera permission to use this app",
        [{ text: "Okay" }]
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      console.log("No permission");
      return;
    }
    console.log("Launch Camera");

    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet</Text>
        <Image style={styles.image} />
        <View style={styles.buttonWrapper}>
          <Button
            title="Take Image"
            color={Colors.primary}
            onPress={takeImageHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    padding: 20,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonWrapper: {
    marginVertical: 20,
  },
});

export default ImgPicker;
