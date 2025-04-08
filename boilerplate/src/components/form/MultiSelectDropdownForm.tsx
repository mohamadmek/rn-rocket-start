import { Controller, useFormContext } from 'react-hook-form';
import { ViewStyle } from 'react-native';
import { Text } from '../text/Text';
import { FlexColumn } from '../layouts';
import {
  MultiSelectDropdown,
  MultiSelectItem,
} from '../multiSelectDropdown/MultiSelectDropdown';

interface IMultiSelectDropdownFormProps {
  name: string;
  items: MultiSelectItem[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  hideError?: boolean;
  maxHeight?: number;
  containerStyle?: ViewStyle;
  searchPlaceholder?: string;
  allowCustomItems?: boolean;
  customItemAddLabel?: string;
  onCustomItemAdd?: (label: string) => void;
  onSearch?: (searchText: string) => void;
}

export const MultiSelectDropdownForm = ({
  name,
  items,
  label,
  placeholder,
  disabled = false,
  searchable = false,
  hideError = false,
  maxHeight,
  containerStyle,
  searchPlaceholder,
  allowCustomItems = false,
  customItemAddLabel,
  onCustomItemAdd,
  onSearch,
}: IMultiSelectDropdownFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FlexColumn gap={3}>
          <MultiSelectDropdown
            title={label}
            items={items}
            selectedItems={value || []}
            onChange={onChange}
            placeholder={placeholder}
            containerStyle={containerStyle}
            maxHeight={maxHeight}
            disabled={disabled}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            allowCustomItems={allowCustomItems}
            customItemAddLabel={customItemAddLabel}
            onCustomItemAdd={onCustomItemAdd}
            onSearch={onSearch}
          />

          {!hideError &&
            errors[name] &&
            typeof errors[name]?.message === 'string' && (
              <Text size="text_sm" type="error">
                {errors[name].message as string}
              </Text>
            )}
        </FlexColumn>
      )}
    />
  );
};
