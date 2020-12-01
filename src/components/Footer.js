import { useImage } from 'use-cloudinary';

import { Flex, Text, Box, Link, Button, Image } from '@chakra-ui/react';

export default function Footer() {
  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.7,
    },
  };
  return (
    <Flex
      minW="100%;"
      height="5rem"
      px={5}
      py={4}
      justifyContent="flex-end"
      alignItems="flex-start"
      backgroundColor="red.900"
      alignSelf="flex-end"
    >
      <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
    </Flex>
  );
}
