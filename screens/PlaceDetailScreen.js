import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlaceDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>PLACE DETAIL SCREEN</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({ screen: { flex: 1 } });

export default PlaceDetailScreen;
