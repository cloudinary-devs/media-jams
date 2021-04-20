import React from 'react';
import Link from 'next/link';
import { Icon, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { FaMusic, FaImage, FaFilm, FaFile } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

export default function Hero() {
  const floating = keyframes`
    0% { transform: translatey(0px)}
    50% { transform: translatey(-20px)}
    100% { transform: translatey(0px)}
  `;

  return (
    <Flex backgroundColor="grey.900" alignItems="center" height="95vh">
      <Flex
        h="100%"
        align="flex-end "
        w="25%"
        direction="column"
        justify="space-around"
        display={{ base: 'none ', lg: 'inherit' }}
      >
        <Icon
          sx={{ animation: `${floating} 6s ease-in-out infinite` }}
          color="white"
          as={FaImage}
          mr="10"
          boxSize="100px"
        />
        <Icon
          sx={{ animation: `${floating} 6s ease-in-out infinite` }}
          alignSelf="flex-start"
          ml={40}
          mb={10}
          color="white"
          as={FaMusic}
          boxSize="100px"
        />
      </Flex>
      <Flex direction="column" w={{ base: '100%', lg: '50%' }}>
        <Heading
          as="h1"
          fontFamily="Bangers, cursive"
          fontSize={{ base: '7xl', xl: '170px' }}
          letterSpacing="wide"
          lineHeight="base"
          color="yellow.900"
          textAlign="center"
          lineHeight={1}
        >
          Learn Media
        </Heading>
        <Heading
          as="h1"
          fontFamily="Bangers, cursive"
          fontSize={{ base: '7xl', xl: '170px' }}
          letterSpacing="wide"
          lineHeight="base"
          color="white"
          textAlign="center"
          lineHeight={1}
        >
          for apps
        </Heading>
        <Text
          color="white"
          textAlign="center"
          mt={6}
          w="50%"
          alignSelf="center"
          fontSize="2xl"
        >
          Discover top practices and tools applying media technology in modern
          websites, apps, and stacks
        </Text>
        <Link href="/post" passHref>
          <Button
            bg="grey.700"
            color="yellow.400"
            w="20%"
            alignSelf="center"
            mt={6}
            size="lg"
            textDecoration="none"
            _hover={{
              textDecoration: 'none',
            }}
            _visited={{
              textDecoration: 'none',
            }}
          >
            Browse
          </Button>
        </Link>
      </Flex>
      <Flex
        h="100%"
        align="flex-start "
        w="25%"
        direction="column"
        justify="space-around"
        display={{ base: 'none ', lg: 'inherit' }}
      >
        <Icon
          sx={{ animation: `${floating} 6s ease-in-out infinite` }}
          mt={40}
          alignSelf="flex-start"
          justifySelf="center"
          color="white"
          as={FaFilm}
          ml={20}
          boxSize="100px"
        />
        <Icon
          sx={{ animation: `${floating} 6s ease-in-out infinite` }}
          alignSelf="flex-end"
          mr={40}
          mb={10}
          color="white"
          as={FaFile}
          boxSize="80px"
        />
      </Flex>
    </Flex>
  );
}
