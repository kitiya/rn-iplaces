import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
import { ENV } from "../constants/env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    // converse (lat, lng) to address
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.MapApiKey}`
    );

    if (!response.ok) {
      throw new Error("Error on the reverse geocoding request #1");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Error on the reverse geocoding request #2");
    }

    const address = resData.results[0].formatted_address;

    // split the image path to an array
    // and pop the last element which is a filename
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      // moving a file from one directory to another
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      // insert data to SQLite database
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
