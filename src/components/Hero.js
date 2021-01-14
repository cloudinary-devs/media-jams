import React from 'react';

import {
  useBreakpointValue,
  Heading,
  Spacer,
  Flex,
  Box,
} from '@chakra-ui/react';
import Image from '@components/Image';

export default function Hero({ heroImg }) {
  const headings = useBreakpointValue({
    base: 'md',
    md: 'xl',
    lg: '2xl',
  });

  return (
    <Flex
      h="xl"
      direction="column"
      backgroundColor="grey.900"
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading
        fontSize="6.5rem"
        mt={16}
        as="h1"
        textStyle="headline-page"
        color="yellow.900"
      >
        Putting Media to Work
      </Heading>
      <Heading
        fontSize="6.5rem"
        as="h1"
        textStyle="headline-page"
        color="yellow.900"
      >
        IS HARD
      </Heading>
      <Box
        pt="2rem"
        flex={{ sm: 1, base: 0 }}
        boxSize="40rem"
        width={['100%', '40rem']}
      >
        <Image alt="Feature Image" src={heroImg} />
      </Box>
      <Spacer backgroundColor="white" />
    </Flex>
  );
}
