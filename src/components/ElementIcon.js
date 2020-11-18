import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import PowerElement from '@lib/assets/power_element.svg';
import SpeedElement from '@lib/assets/power_element.svg';
import FlexibilityElement from '@lib/assets/power_element.svg';

const phraseAttributes = {
  power: {
    left: '-10',
    top: '150',
    degrees: '18deg',
    Element: PowerElement,
  },
  speed: {
    left: '-10',
    top: '150',
    degrees: '18deg',
    Element: SpeedElement,
  },
  flexibility: {
    left: '-10',
    top: '150',
    degrees: '18deg',
    Element: FlexibilityElement,
  },
};

function ElementIcon({ phrase }) {
  const { left, top, degrees, Element } = phraseAttributes[phrase.toString()];
  return (
    <Box w="180px" opacity="40%" position="relative">
      <Element />
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
