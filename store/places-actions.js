import * as FileSystem from "expo-file-system";
import { insertPlace } from "../helpers/db";

export const ADD_PLACE = "ADD_PLACE";

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

      console.log(dbResult);

      dispatch({
        type: ADD_PLACE,
        placeData: { title: title, image: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
