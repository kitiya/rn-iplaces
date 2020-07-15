import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import * as placesAction from "../store/places-actions";
import ImgPicker from "../components/ImgPicker";
import LocationPicker from "../components/LocationPicker";
import Colors from "../constants/Colors";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // TODO: Add validation
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesAction.addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={titleChangeHandler}
            value={titleValue}
          />
          <ImgPicker onImageTaken={imageTakenHandler} />
          <LocationPicker navigation={props.navigation} />
          <View style={styles.buttonWrapper}>
            <Button
              title="SavePlace"
              color={Colors.primary}
              onPress={savePlaceHandler}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  form: { margin: 30 },
  label: { fontSize: 18, marginBottom: 15 },
  textInput: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  buttonWrapper: {
    padding: 5,
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
});

export default NewPlaceScreen;
