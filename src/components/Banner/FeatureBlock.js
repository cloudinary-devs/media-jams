import { Flex, Text } from '@chakra-ui/react';

export default function FeatureBlock({ header, text, LeftIcon }) {
  return (
    <Flex w="100%" direction="column">
      <Flex align="center">
        <LeftIcon />
        <Text ml="12px" variant="B400" fontWeight="bold" color="grey.900">
          {header}
        </Text>
      </Flex>
      <Text pl={8} mt="5px" variant="B300" color="grey.700">
        {text}
      </Text>
    </Flex>
  );
}
