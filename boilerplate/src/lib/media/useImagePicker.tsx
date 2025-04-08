import { useActionSheet } from '@expo/react-native-action-sheet';
import * as mediaPicker from './picker';
import { processImageAssets } from './manipulator';
import { useState } from 'react';
import {
  ImagePickerResult,
  ImagePickerCanceledResult,
  ImagePickerSuccessResult,
  ImagePickerOptions,
} from 'expo-image-picker';

/**
 * React hook that provides image picking functionality
 * @returns Object with pickImage function to trigger the image selection
 */
export const useImagePicker = () => {
  const actionSheet = useActionSheet();
  const { showActionSheetWithOptions } = actionSheet;
  const [selectedImages, setSelectedImages] = useState<ImagePickerResult>({
    canceled: true,
    assets: null,
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingImages, setProcessingImages] = useState<string[]>([]);
  const [pickError, setPickError] = useState<string | null>(null);

  /**
   * Deletes an image from the selectedImages state by its URI
   * @param uri URI of the image to delete
   */
  const deleteImage = (uri: string) => {
    if (!selectedImages.assets) return;

    const newAssets = selectedImages.assets.filter(
      (asset) => asset.uri !== uri,
    );

    if (newAssets.length === 0) {
      setSelectedImages({
        canceled: true,
        assets: null,
      } as ImagePickerCanceledResult);
    } else {
      setSelectedImages({
        canceled: false,
        assets: newAssets,
      } as ImagePickerSuccessResult);
    }
  };

  /**
   * Processes the new selected images based on options
   * @param newResult The result from image picker with new images
   * @param options The image picker options that were used
   * @returns Boolean indicating success
   */
  const processNewImages = async (
    newResult: ImagePickerResult,
    options?: ImagePickerOptions,
  ): Promise<boolean> => {
    if (
      newResult.canceled ||
      !newResult.assets ||
      newResult.assets.length === 0
    ) {
      return false;
    }

    try {
      setIsProcessing(true);

      // Keep track of which images are being processed
      const imagesToProcess = newResult.assets.map((asset) => asset.uri);
      setProcessingImages(imagesToProcess);

      // Process images (compress if needed)
      const processedAssets = await processImageAssets(
        newResult.assets,
        (uri) => {
          // Remove from processing list as each image completes
          setProcessingImages((prev) => prev.filter((item) => item !== uri));
        },
      );

      // Create a new result with processed assets
      const processedResult: ImagePickerResult = {
        ...newResult,
        assets: processedAssets,
      };

      // If multiple selection is not enabled, replace existing images
      if (!options?.allowsMultipleSelection) {
        setSelectedImages(processedResult as ImagePickerSuccessResult);
        return true;
      }

      // Otherwise, append the new images to existing ones

      // If we don't have any images yet, just set the new result
      if (!selectedImages.assets) {
        setSelectedImages(processedResult as ImagePickerSuccessResult);
        return true;
      }

      // Append the new images to existing ones
      const combinedAssets = [...selectedImages.assets, ...processedAssets];

      // Remove any duplicates by URI
      const uniqueAssets = combinedAssets.filter(
        (asset, index, self) =>
          index === self.findIndex((a) => a.uri === asset.uri),
      );

      setSelectedImages({
        canceled: false,
        assets: uniqueAssets,
      } as ImagePickerSuccessResult);

      return true;
    } catch (error) {
      console.error('Error processing images:', error);
      return false;
    } finally {
      setIsProcessing(false);
      setProcessingImages([]);
    }
  };

  /**
   * Opens an action sheet for selecting images from camera or gallery
   * @returns Promise with the selected image URI or null if cancelled
   */
  const pickImage = async (
    options?: ImagePickerOptions,
  ): Promise<string | null> => {
    // Clear any previous errors
    setPickError(null);

    return new Promise<string | null>((resolve) => {
      const actionOptions = ['Take Photo', 'Photo Library', 'Cancel'];

      const cancelButtonIndex = 2;

      showActionSheetWithOptions(
        {
          options: actionOptions,
          cancelButtonIndex,
          userInterfaceStyle: 'light',
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) {
            // Take photo
            const permissionResult =
              await mediaPicker.requestCameraPermissions();

            if (permissionResult.granted === false) {
              // Handle permission denied
              resolve(null);
              return;
            }

            try {
              const result = await mediaPicker.launchCamera(options);

              if (
                !result.canceled &&
                result.assets &&
                result.assets.length > 0
              ) {
                const success = await processNewImages(result, options);
                if (success) {
                  resolve(result.assets[0].uri);
                } else {
                  resolve(null);
                }
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Error taking photo:', error);
              setPickError('Failed to pick the image. Please try again.');
              resolve(null);
            }
          } else if (buttonIndex === 1) {
            // Photo library
            const permissionResult =
              await mediaPicker.requestMediaLibraryPermissions();

            if (permissionResult.granted === false) {
              // Handle permission denied
              resolve(null);
              return;
            }
            try {
              const result = await mediaPicker.launchImageLibrary(options);
              if (
                !result.canceled &&
                result.assets &&
                result.assets.length > 0
              ) {
                const success = await processNewImages(result, options);
                if (success) {
                  resolve(result.assets[0].uri);
                } else {
                  resolve(null);
                }
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Error picking image:', error);
              setPickError('Failed to pick the image. Please try again.');
              resolve(null);
            }
          } else {
            // Cancel
            resolve(null);
          }
        },
      );
    });
  };

  return {
    pickImage,
    selectedImages,
    setSelectedImages,
    deleteImage,
    isProcessing,
    processingImages,
    pickError,
  };
};
