import * as ExpoImagePicker from 'expo-image-picker';

export const MediaTypeOptions = ExpoImagePicker.MediaTypeOptions;

/**
 * Request camera permissions from the user
 * @returns Permission result
 */
export const requestCameraPermissions = async () => {
  return await ExpoImagePicker.requestCameraPermissionsAsync();
};

/**
 * Launch the device camera to take a photo
 * @param options Camera options
 * @returns Result containing the selected image(s) or cancel status
 */
export const launchCamera = async (
  options: ExpoImagePicker.ImagePickerOptions = {},
) => {
  return await ExpoImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    ...options,
  });
};

/**
 * Request media library permissions from the user
 * @returns Permission result
 */
export const requestMediaLibraryPermissions = async () => {
  return await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
};

/**
 * Launch the device image library to select an image
 * @param options Image picker options
 * @returns Result containing the selected image(s) or cancel status
 */
export const launchImageLibrary = async (
  options: ExpoImagePicker.ImagePickerOptions = {},
) => {
  return await ExpoImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    mediaTypes: 'images',

    ...options,
  });
};
