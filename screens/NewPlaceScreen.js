import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewPlaceScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>NEW PLACE SCREEN</Text>
    </View>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({ screen: { flex: 1 } });

export default NewPlaceScreen;
