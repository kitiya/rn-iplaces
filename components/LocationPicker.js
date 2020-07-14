import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";

import MapPreview from "./MapPreview";
import Colors from "../constants/Colors";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setFetching] = useState(false);

  const verifyPermissions = async () => {
    const result = await Location.requestPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permission!",
        "You need to grant location permission to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location.",
        "Please try again later or pick a location from a map",
        [{ text: "Okay" }]
      );
    }
    setFetching(false);
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location choosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.buttonWrapper}>
        <Button
          title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: { marginBottom: 15 },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: "50%",
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  buttonWrapper: {
    padding: 5,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
});

export default LocationPicker;
