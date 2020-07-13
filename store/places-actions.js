import * as FileSystem from "expo-file-system";
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
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
  };
};
