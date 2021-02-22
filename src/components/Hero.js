import React from 'react';

import { Heading, Flex, Text, Button, Box } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
      direction="column"
      backgroundColor="grey.900"
      alignItems="center"
      height="100vh"
    >
      <Flex direction="column" w={{ base: '100%', md: '30%' }} mt={10}>
        <Heading
          fontSize={['6xl', '8xl']}
          as="h1"
          textStyle="headline-page"
          color="yellow.900"
          textAlign="center"
          lineHeight={1}
        >
          Unlock Media <span style={{ color: 'white' }}>in your apps</span>
        </Heading>
        <Text
          color="white"
          textAlign="center"
          mt={6}
          w="80%"
          alignSelf="center"
        >
          Media Jams provide the knowledge you need to level up your websites
          with top tools and practices
        </Text>
        <Button
          bg="grey.700"
          color="yellow.400"
          w="20%"
          alignSelf="center"
          mt={6}
        >
          Browse
        </Button>
      </Flex>
      <FeaturedCarousel />
    </Flex>
  );
}

function FeaturedCarousel() {
  return <Box h="420px" w="50%" bg="white" mt={8}></Box>;
}
