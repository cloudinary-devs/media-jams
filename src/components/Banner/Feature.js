import { Flex, Text } from '@chakra-ui/react';
import { GreenCheck } from '@components/Icons';

export default function Feature({ children, ...rest }) {
  return (
    <Flex w="auto" align="center" {...rest}>
      <GreenCheck />
      <Text variant="B400" color="grey.700" pl={3}>
        {children}
      </Text>
    </Flex>
  );
}
