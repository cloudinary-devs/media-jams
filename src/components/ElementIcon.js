import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import PowerElement from '@lib/assets/power_element.svg';
import SpeedElement from '@lib/assets/speed_element.svg';
import FlexibilityElement from '@lib/assets/flexibility_element.svg';

const phraseAttributes = {
  power: {
    left: '-10',
    top: '150',
    degrees: '18deg',
    Element: PowerElement,
  },
  speed: {
    left: '15',
    top: '125',
    degrees: '0deg',
    Element: SpeedElement,
  },
  flexibility: {
    left: '1',
    top: '130',
    degrees: '-18deg',
    Element: FlexibilityElement,
  },
};

function ElementIcon({ phrase, ...props }) {
  const { left, top, degrees, Element } = phraseAttributes[phrase.toString()];
  return (
    <Box my={3} w="150px" opacity="40%" position="relative" {...props}>
      <Element minWidth="150px" />
      <Text
        position="absolute"
        left={left}
        top={top}
        textStyle="headline-accent"
        textTransform="uppercase"
        transform={`rotate(${degrees})`}
        letterSpacing="wide"
        fontSize="6xl"
        ml="2"
      >
        {phrase}
      </Text>
    </Box>
  );
}

export default ElementIcon;
