import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../config/theme';

const TextComponent = ({title, style, small, big, bold, numberOfLines}) => {
  let activeColors = colors;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: activeColors.tint,
          fontSize: small ? 14 : big ? 24 : 16,
          fontWeight: bold || big ? 'bold' : 'normal',
        },
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TextComponent;
