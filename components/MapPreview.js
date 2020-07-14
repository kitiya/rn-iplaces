import React from "react";
import { View, Image, StyleSheet } from "react-native";

// import { MAP_API_KEY } from "react-native-dotenv";
import { ENV } from "../constants/env";

const MapPreview = (props) => {
  let imagePreviewUrl;
  const MAP_API_KEY = ENV.MapApiKey;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${MAP_API_KEY}`;
  }
  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
