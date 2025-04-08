import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
  Pressable,
  Dimensions,
  TextInput,
  Platform,
  BackHandler,
} from 'react-native';
import { tokens, useTheme } from '@/src/theme';
import { Text } from '../text/Text';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlexBetween } from '../layouts/FlexBetween';

export type MultiSelectItem = {
  id: string;
  label: string;
  value: string;
};

export type MultiSelectDropdownProps = {
  items: MultiSelectItem[];
  selectedItems: MultiSelectItem[];
  onChange: (items: MultiSelectItem[]) => void;
  placeholder?: string;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  maxHeight?: number;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchDebounce?: number;
  onSearch?: (searchText: string) => void;
  allowCustomItems?: boolean;
  customItemAddLabel?: string;
  onCustomItemAdd?: (label: string) => void;
};

export const MultiSelectDropdown = ({
  items,
  selectedItems,
  onChange,
  placeholder = 'Wähle aus unseren Vorschlägen',
  title,
  containerStyle,
  maxHeight = 300,
  disabled = false,
  searchable = false,
  searchPlaceholder = 'Suchen...',
  searchDebounce = 300,
  onSearch,
  allowCustomItems = false,
  customItemAddLabel = 'hinzufügen',
  onCustomItemAdd,
}: MultiSelectDropdownProps) => {
  const { palette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rotation = useSharedValue(0);
  const headerRef = useRef<View>(null);
  const [searchText, setSearchText] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<View>(null);

  // Track header layout
  const [headerLayout, setHeaderLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });

  // Store screen dimensions for positioning calculations
  const { height: screenHeight } = Dimensions.get('window');

  // Measure header position when needed
  const measureHeaderPosition = useCallback(() => {
    if (headerRef.current) {
      headerRef.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setHeaderLayout({
            x,
            y,
            width,
            height,
            pageX,
            pageY,
          });
        },
      );
    }
  }, []);

  // Update measurements when opening dropdown
  useEffect(() => {
    if (isOpen) {
      measureHeaderPosition();
    }
  }, [isOpen, measureHeaderPosition]);

  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (isOpen) {
            setIsOpen(false);
            return true;
          }
          return false;
        },
      );

      return () => backHandler.remove();
    }
  }, [isOpen]);

  const toggleDropdown = useCallback(() => {
    if (disabled) return;

    // Toggle dropdown state
    setIsOpen((prev) => {
      const newState = !prev;

      // Animate rotation
      rotation.value = withTiming(newState ? 180 : 0, { duration: 300 });

      return newState;
    });
  }, [disabled, rotation]);

  // Close dropdown - specific function for ensuring drop closes properly on Android
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    rotation.value = withTiming(0, { duration: 300 });
  }, [rotation]);

  // Calculate dropdown position
  const getDropdownPosition = useCallback(() => {
    // Calculate available space below the header
    const spaceBelow =
      screenHeight - (headerLayout.pageY + headerLayout.height);
    // Determine max height based on available space
    const calculatedMaxHeight = Math.min(maxHeight, spaceBelow - 20);

    return {
      top: headerLayout.height + 4,
      width: headerLayout.width,
      maxHeight: calculatedMaxHeight,
    };
  }, [headerLayout, maxHeight, screenHeight]);

  const animatedArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const isSelected = useCallback(
    (item: MultiSelectItem) => {
      return selectedItems.some((selected) => selected.id === item.id);
    },
    [selectedItems],
  );

  const handleItemPress = useCallback(
    (item: MultiSelectItem) => {
      let newSelectedItems;
      if (isSelected(item)) {
        newSelectedItems = selectedItems.filter(
          (selected) => selected.id !== item.id,
        );
      } else {
        newSelectedItems = [...selectedItems, item];
      }
      onChange(newSelectedItems);
    },
    [isSelected, onChange, selectedItems],
  );

  const removeSelectedItem = useCallback(
    (itemId: string) => {
      const newSelectedItems = selectedItems.filter(
        (item) => item.id !== itemId,
      );
      onChange(newSelectedItems);
    },
    [onChange, selectedItems],
  );

  // Filter items based on search text
  const filteredItems = useMemo(() => {
    if (!searchText.trim()) return items;

    return items.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [items, searchText]);

  // Handle search input change with debounce
  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchText(text);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for debounce
      searchTimeoutRef.current = setTimeout(() => {
        if (onSearch) {
          onSearch(text);
        }
      }, searchDebounce);
    },
    [onSearch, searchDebounce],
  );

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchText('');
    }
  }, [isOpen]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Add custom item to selection
  const handleAddCustomItem = useCallback(() => {
    if (!searchText.trim()) return;

    // Generate a unique ID for the new item
    const newId = `custom-${Date.now()}`;
    const newItem: MultiSelectItem = {
      id: newId,
      label: searchText.trim(),
      value: searchText.trim().toLowerCase().replace(/\s+/g, '-'),
    };

    // Add to selected items
    const newSelectedItems = [...selectedItems, newItem];
    onChange(newSelectedItems);

    // Clear search
    setSearchText('');

    // Call custom callback if provided
    if (onCustomItemAdd) {
      onCustomItemAdd(searchText.trim());
    }
  }, [searchText, selectedItems, onChange, onCustomItemAdd]);

  // Check if search text doesn't match any existing items
  const hasNoExactMatch = useMemo(() => {
    if (!searchText.trim()) return false;
    return !items.some(
      (item) => item.label.toLowerCase() === searchText.trim().toLowerCase(),
    );
  }, [items, searchText]);

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <Text size="text_md" style={styles.title}>
          {title}
        </Text>
      )}

      {/* Header/Trigger - This is the clickable area to open/close dropdown */}
      <View style={styles.dropdownContainer} ref={headerRef}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={toggleDropdown}
          style={[
            styles.header,
            {
              borderColor: palette.gray_300,
              backgroundColor: 'transparent',
            },
            disabled && styles.disabled,
          ]}
        >
          <Text
            size="text_lg"
            style={{ color: selectedItems.length > 0 ? 'black' : 'gray' }}
          >
            {selectedItems.length > 0
              ? `${selectedItems.length} ausgewählt`
              : placeholder}
          </Text>
          <Animated.View style={animatedArrowStyle}>
            <MaterialIcons name="expand-more" size={24} />
          </Animated.View>
        </TouchableOpacity>

        {/* Universal backdrop */}
        {isOpen && (
          <Pressable style={styles.backdrop} onPress={closeDropdown} />
        )}

        {/* Dropdown Content - Absolutely positioned below the header */}
        {isOpen && (
          <View
            ref={dropdownRef}
            style={[
              styles.dropdownContent,
              {
                borderColor: palette.gray_300,
                backgroundColor: '#F1F4F4',
                ...getDropdownPosition(),
              },
            ]}
          >
            {/* Search input */}
            {searchable && (
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <TextInput
                    style={[
                      styles.searchInput,
                      { borderColor: 'rgba(0, 0, 0, 0.10)' },
                    ]}
                    placeholder={searchPlaceholder}
                    value={searchText}
                    onChangeText={handleSearchChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <MaterialIcons
                    name="search"
                    size={20}
                    style={styles.searchIcon}
                  />
                </View>
              </View>
            )}

            {/* Empty state with option to add custom item */}
            {filteredItems.length === 0 &&
              searchText.trim() &&
              allowCustomItems && (
                <View style={styles.emptyContainer}>
                  <View
                    style={{
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                      width: '100%',
                    }}
                  >
                    <Text center size="text_lg" style={styles.noResultsText}>
                      Keine Ergebnisse gefunden
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.addCustomItemButton,
                      // { backgroundColor: palette.primary }
                    ]}
                    onPress={handleAddCustomItem}
                  >
                    <FlexBetween
                      style={{
                        width: '100%',
                        paddingHorizontal: 24,
                        paddingVertical: 10,
                      }}
                    >
                      <Text size="text_md">
                        "{searchText}" {customItemAddLabel}
                      </Text>
                      <MaterialCommunityIcons
                        name="plus-circle-outline"
                        size={24}
                      />
                    </FlexBetween>
                  </TouchableOpacity>
                </View>
              )}

            {/* Add custom item button when there are results but no exact match */}
            {filteredItems.length > 0 &&
              hasNoExactMatch &&
              allowCustomItems && (
                <TouchableOpacity
                  style={[
                    styles.addCustomItemRow,
                    { borderBottomColor: palette.gray_300 },
                  ]}
                  onPress={handleAddCustomItem}
                >
                  <MaterialIcons name="add" size={20} color={palette.primary} />
                  <Text size="text_md" style={styles.addCustomItemText}>
                    "{searchText}" {customItemAddLabel}
                  </Text>
                </TouchableOpacity>
              )}

            {/* Empty state without custom items */}
            {filteredItems.length === 0 &&
              (!searchText.trim() || !allowCustomItems) && (
                <View style={styles.emptyContainer}>
                  <Text size="text_md">Keine Ergebnisse gefunden</Text>
                </View>
              )}

            {/* Item list */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
              nestedScrollEnabled={true}
            >
              {filteredItems.map((item, index) => (
                <Pressable
                  key={item.id}
                  android_ripple={
                    Platform.OS === 'android'
                      ? { color: 'rgba(0,0,0,0.1)' }
                      : undefined
                  }
                  onPress={() => handleItemPress(item)}
                  style={[
                    styles.item,
                    index === filteredItems.length - 1
                      ? { borderBottomWidth: 0 }
                      : null,
                  ]}
                >
                  <Text
                    size="text_lg"
                    style={{
                      flex: 1,
                      color: isSelected(item) ? 'black' : 'gray',
                    }}
                  >
                    {item.label}
                  </Text>
                  {isSelected(item) ? (
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.40)',
                        backgroundColor: 'rgba(255, 255, 255, 0.40)',
                      }}
                    >
                      <MaterialIcons
                        name="check"
                        size={16}
                        color={'rgba(107, 170, 223, 1)'}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: 'rgba(0, 0, 0, 0.10)',
                        backgroundColor: 'rgba(255, 255, 255, 0.60)',
                      }}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>

            {/* Invisible backdrop for Android to capture touches outside dropdown */}
            {Platform.OS === 'android' && (
              <Pressable
                style={styles.androidBackdrop}
                onPress={closeDropdown}
              />
            )}
          </View>
        )}
      </View>

      {/* Selected Items Chips */}
      {selectedItems.length > 0 && (
        <View style={styles.selectedItemsContainer}>
          <View style={styles.chipsContainer}>
            {selectedItems.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.chip,
                  {
                    backgroundColor: 'rgba(255, 255, 255, 0.40)',
                    borderColor: 'rgba(255, 255, 255, 0.60)',
                  },
                ]}
                onPress={() => removeSelectedItem(item.id)}
              >
                <Text size="text_lg">{item.label}</Text>
                <MaterialIcons name="close" size={18} />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: tokens.space.sm,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 100,
    ...(Platform.OS === 'android' && { elevation: 1 }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: tokens.space.md,
    borderBottomWidth: 1,
    height: 48,
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
  disabled: {
    opacity: 0.6,
  },
  dropdownContent: {
    position: 'absolute',
    width: '100%',
    borderWidth: 1,
    borderRadius: tokens.borderRadius.md,
    borderColor: 'rgba(0, 0, 0, 0.10)',
    overflow: 'hidden',
    zIndex: 1000,
    ...(Platform.OS === 'android'
      ? { elevation: 5 }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }),
  },
  androidBackdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0,0,0,0.05)',
    zIndex: -1,
  },
  backdrop: {
    position: 'absolute',
    top: -5000,
    left: -5000,
    width: 10000,
    height: 10000,
    backgroundColor: 'transparent',
    zIndex: 50,
  },
  scrollContent: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.space._2xl,
    height: 45,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  selectedItemsContainer: {
    marginTop: tokens.space.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.space.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.space.sm,
    paddingVertical: tokens.space.xs,
    borderRadius: 12,
  },
  searchContainer: {
    padding: 8,
  },
  searchInputContainer: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 35, // Make room for the icon
    fontSize: 14,
    flex: 1,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
  emptyContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    marginBottom: 16,
  },
  addCustomItemButton: {
    // paddingHorizontal: 16
  },
  addCustomItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  addCustomItemText: {
    marginLeft: 12,
  },
});
