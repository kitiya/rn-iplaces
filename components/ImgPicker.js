import React, { useState } from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import Colors from "../constants/Colors";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
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
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image picked yet</Text>
        )}
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
