import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImagePickerAsset } from 'expo-image-picker';
import { Platform } from 'react-native';

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Maximum dimensions for images
const IMAGE_MAX_DIMENSIONS = {
  width: 2048,
  height: 2048,
};

// File extensions and MIME types
// const FILE_TYPES = {
//   JPEG: {
//     extension: ".jpg",
//     mime: "image/jpeg"
//   },
//   PNG: {
//     extension: ".png",
//     mime: "image/png"
//   }
// };

/**
 * Get file size in bytes
 * @param uri File URI
 * @returns File size in bytes or null if couldn't be determined
 */
export const getFileSize = async (uri: string): Promise<number | null> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists && fileInfo.size) {
      return fileInfo.size;
    }
    return null;
  } catch (error) {
    console.error('Error getting file size:', error);
    return null;
  }
};

/**
 * Get the dimensions of an image
 * @param uri Image URI
 * @returns Object containing width and height
 */
export const getImageDimensions = async (
  uri: string,
): Promise<{ width: number; height: number }> => {
  try {
    // Perform an empty manipulation to get image dimensions
    const result = await ImageManipulator.manipulateAsync(uri, [], {});
    return {
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    throw error;
  }
};

/**
 * Calculate optimal dimensions while maintaining aspect ratio
 * @param originalDims Original dimensions
 * @returns New dimensions that fit within maximum allowed dimensions
 */
export const getResizedDimensions = (originalDims: {
  width: number;
  height: number;
}) => {
  if (
    originalDims.width <= IMAGE_MAX_DIMENSIONS.width &&
    originalDims.height <= IMAGE_MAX_DIMENSIONS.height
  ) {
    return originalDims;
  }

  const ratio = Math.min(
    IMAGE_MAX_DIMENSIONS.width / originalDims.width,
    IMAGE_MAX_DIMENSIONS.height / originalDims.height,
  );

  return {
    width: Math.round(originalDims.width * ratio),
    height: Math.round(originalDims.height * ratio),
  };
};

/**
 * Safely delete a file
 * @param path File path to delete
 */
export const safeDeleteAsync = async (path: string) => {
  try {
    await FileSystem.deleteAsync(normalizePath(path), { idempotent: true });
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};

/**
 * Normalize file path for different platforms
 * @param path File path
 * @param allPlatforms Whether to normalize for all platforms
 * @returns Normalized path
 */
export const normalizePath = (path: string, allPlatforms = false): string => {
  if (Platform.OS === 'android' || allPlatforms) {
    if (!path.startsWith('file://')) {
      return `file://${path}`;
    }
  }
  return path;
};

/**
 * Compress image using progressive quality reduction
 * @param uri Image URI
 * @param maxSizeBytes Maximum file size in bytes
 * @param onComplete Callback function triggered when compression is complete
 * @returns URI of compressed image
 */
export const compressImage = async (
  uri: string,
  maxSizeBytes: number = MAX_FILE_SIZE,
  onComplete?: (uri: string) => void,
): Promise<string> => {
  try {
    // Check current file size
    const fileSize = await getFileSize(uri);

    // If file size is already below threshold or couldn't be determined, return original
    if (!fileSize || fileSize <= maxSizeBytes) {
      if (onComplete) onComplete(uri);
      return uri;
    }

    // Get image dimensions and calculate optimal size for resizing
    const originalDims = await getImageDimensions(uri);
    const newDimensions = getResizedDimensions(originalDims);

    // Try progressively lower quality settings until the image is small enough
    for (let i = 0; i < 9; i++) {
      // Quality goes from 0.9 down to 0.1 in steps of 0.1
      const quality = Math.round((1 - 0.1 * i) * 10) / 10;

      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [
          {
            resize: {
              width: newDimensions.width,
              height: newDimensions.height,
            },
          },
        ],
        {
          compress: quality,
          format: ImageManipulator.SaveFormat.JPEG,
        },
      );

      const resultSize = await getFileSize(manipResult.uri);

      if (!resultSize) {
        // If we can't determine size, assume this is good enough
        if (onComplete) onComplete(manipResult.uri);
        return manipResult.uri;
      }

      if (resultSize <= maxSizeBytes) {
        // We found a suitable compression level
        if (onComplete) onComplete(manipResult.uri);
        return manipResult.uri;
      } else if (i < 8) {
        // Clean up this attempt if we're going to try again
        safeDeleteAsync(manipResult.uri);
      } else {
        // This is our last attempt, use it even if it's not small enough
        if (onComplete) onComplete(manipResult.uri);
        return manipResult.uri;
      }
    }

    // If all compression attempts fail, return the original
    if (onComplete) onComplete(uri);
    return uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    if (onComplete) onComplete(uri);
    return uri; // Return original if compression fails
  }
};

/**
 * Process image assets to ensure they meet size requirements
 * @param assets Array of ImagePickerAsset objects
 * @param onImageProcessed Callback function that gets triggered when a specific image is processed
 * @returns Promise with processed assets
 */
export const processImageAssets = async (
  assets: ImagePickerAsset[],
  onImageProcessed?: (uri: string) => void,
): Promise<ImagePickerAsset[]> => {
  const processedAssets: ImagePickerAsset[] = [];

  for (const asset of assets) {
    try {
      // Check if image needs compression
      const fileSize = await getFileSize(asset.uri);
      if (fileSize && fileSize > MAX_FILE_SIZE) {
        // Compress the image
        const compressedUri = await compressImage(
          asset.uri,
          MAX_FILE_SIZE,
          (uri) => {
            // Notify that this image has been processed
            if (onImageProcessed) onImageProcessed(uri);
          },
        );

        // Update the asset with compressed URI
        processedAssets.push({
          ...asset,
          uri: compressedUri,
        });
      } else {
        // No compression needed, but still notify that processing is complete
        if (onImageProcessed) onImageProcessed(asset.uri);
        processedAssets.push(asset);
      }
    } catch (error) {
      console.error('Error processing asset:', error);
      // Notify even on error
      if (onImageProcessed) onImageProcessed(asset.uri);
      processedAssets.push(asset); // Keep original if processing fails
    }
  }

  return processedAssets;
};
