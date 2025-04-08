import { View } from 'react-native';

export const HeightView = ({ height = 16 }: { height?: number }) => {
  return <View style={{ height }} />;
};
