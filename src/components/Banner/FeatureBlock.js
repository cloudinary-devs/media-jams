import { Flex, Text, useToken } from '@chakra-ui/react';

export default function FeatureBlock({ header, text, LeftIcon, ...rest }) {
  return (
    <Flex
      w="100%"
      direction={{ base: 'column', lg: 'row' }}
      p={{
        base: '24px',
        md: '0',
      }}
      border={{
        base: `1px solid ${useToken('colors', 'grey.300')}`,
        md: '0',
      }}
      borderRadius={{ base: '8px' }}
      {...rest}
    >
      <LeftIcon
        mt={{ base: 0, lg: 1 }}
        mr={{ base: 0, lg: 3 }}
        mb={{ base: '12px', md: '0px' }}
      />
      <Flex direction="column" align="flex-start">
        <Text variant="B400" fontWeight="bold" color="grey.900">
          {header}
        </Text>
        <Text variant="B300" color="grey.700">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
}
