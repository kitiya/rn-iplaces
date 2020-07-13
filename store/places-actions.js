import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy address",
        "43.6532",
        "79.3832"
      );

      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newPath },
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
