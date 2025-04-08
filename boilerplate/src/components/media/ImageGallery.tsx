import React from 'react';
import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImagePickerAsset } from 'expo-image-picker';
import { Image } from 'expo-image';
import { Text } from '../text/Text';
import { HeightView } from '../layouts';

interface ImageGalleryProps {
  images: ImagePickerAsset[] | null;
  onPressAdd: () => void;
  onPressDelete?: (uri: string) => void;
  uploadNewText?: string;
  maxVisibleImages?: number;
  containerStyle?: object;
  imageStyle?: object;
  processingImages?: string[]; // Array of image URIs that are currently being processed
}

/**
 * A component to display a gallery of selected images with delete functionality
 */
export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onPressAdd,
  onPressDelete,
  uploadNewText,
  maxVisibleImages = 3,
  containerStyle,
  imageStyle,
  processingImages = [],
}) => {
  // If there are no images, show only the add button
  if (!images || images.length === 0) {
    return (
      <Pressable
        style={[styles.addButtonContainer, containerStyle]}
        onPress={onPressAdd}
      >
        <MaterialCommunityIcons
          name="cloud-upload-outline"
          size={24}
          color={'black'}
        />
      </Pressable>
    );
  }

  // Check if an image is currently being processed
  const isImageProcessing = (uri: string) => processingImages.includes(uri);

  // If there's only one image
  if (images.length === 1) {
    const isProcessing = isImageProcessing(images[0].uri);

    return (
      <View style={[styles.singleImageContainer, containerStyle]}>
        <Pressable onPress={onPressAdd}>
          <View style={[styles.singleImage, imageStyle]}>
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator size="large" />
                <HeightView height={8} />
                <Text size="text_sm">Processing...</Text>
              </View>
            ) : (
              <Image
                source={{ uri: images[0].uri }}
                style={styles.fullSizeImage}
                contentFit="cover"
              />
            )}
          </View>

          {onPressDelete && !isProcessing && (
            <Pressable
              style={styles.deleteButton}
              onPress={() => onPressDelete(images[0].uri)}
            >
              <AntDesign name="delete" size={20} color="white" />
            </Pressable>
          )}
          <HeightView height={24} />
          <Text center size="text_lg">
            {uploadNewText || 'Upload New Image'}
          </Text>
        </Pressable>
      </View>
    );
  }

  // For multiple images: Prepare data for FlatList - max 3 images + add button
  const displayImages = images.slice(0, maxVisibleImages);
  const hasMoreImages = images.length > maxVisibleImages;
  const remainingImagesCount = images.length - maxVisibleImages;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.galleryContainer}>
        {displayImages.map((item) => {
          const isProcessing = isImageProcessing(item.uri);

          return (
            <View key={item.uri} style={styles.imageWrapper}>
              {isProcessing ? (
                <View style={styles.processingContainerSmall}>
                  <ActivityIndicator size="small" />
                </View>
              ) : (
                <>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.fullSizeImage}
                    contentFit="cover"
                  />
                  {onPressDelete && (
                    <Pressable
                      style={styles.deleteButton}
                      onPress={() => onPressDelete(item.uri)}
                    >
                      <AntDesign name="delete" size={18} color="white" />
                    </Pressable>
                  )}
                </>
              )}
            </View>
          );
        })}

        <Pressable
          style={[styles.addMoreButton, styles.imageWrapper]}
          onPress={onPressAdd}
        >
          {hasMoreImages ? (
            <Text size="text_xl">+{remainingImagesCount}</Text>
          ) : (
            <AntDesign name="plus" size={24} color="#666" />
          )}
        </Pressable>
      </View>
      <HeightView height={16} />
      <Pressable onPress={onPressAdd}>
        <Text center size="text_md">
          {uploadNewText || 'Upload New Image'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: 176,
  },
  singleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    width: 167,
    height: 167,
    borderRadius: 48,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    width: 167,
    height: 167,
    borderRadius: 48,
    overflow: 'hidden',
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
  },
  multipleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    margin: 4,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  addMoreButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  processingContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
  },
  processingContainerSmall: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
  },
});
