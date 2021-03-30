import React from 'react';
import { useQuery } from 'react-query';
import { jams as queryJams } from '@lib/queries/jams';

import Link from 'next/link';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { Carousel, Slide } from '@components/Carousel';

import Image from '@components/Image';

export default function Hero() {
  const { data } = useQuery('featuredJams', queryJams.getFeaturedJams);

  function createSlides(jams) {
    const slides = [];

    const colors = ['blue', 'red', 'green'];

    function pickRandomColor(arr) {
      return Math.floor(Math.random() * arr.length);
    }

    jams.allPost?.map((jam) => {
      const color = colors[pickRandomColor(colors)];
      let Component = () => (
        <Slide colorScheme={color} justify="space-between">
          <Flex
            w="60%"
            p={4}
            alignSelf="flex-start"
            justifySelf="flex-end"
            direction="column"
            h="100%"
            justify="space-between"
            borderRadius="8px"
          >
            <Button alignSelf="flex-start" colorScheme={color}>
              Learn
            </Button>
            <Flex direction="column" height="100%" textOverflow="ellipsis">
              <Heading color={`${color}.600`}>{jam.author.name}</Heading>
              <Heading
                size={{ base: 'sm', lg: 'md' }}
                as="h6"
                color={`${color}.600`}
              >
                {jam.title}
              </Heading>
              <Text size="sm" color={`${color}.400`}>
                {jam.description}
              </Text>
            </Flex>
          </Flex>
          <Image
            container={{
              height: '100%',
              width: '40%',
              position: 'relative',
              alignSelf: 'flex-end',
              borderRadius: '8px',
            }}
            layout="fill"
            objectFit="cover"
            cloudName="mediadevs"
            publicId={jam.author.image.asset.url}
            style={{ borderRadius: '8px' }}
          />
        </Slide>
      );
      return slides.push(Component);
    });

    return slides;
  }

  return (
    <Flex
      direction="column"
      backgroundColor="grey.900"
      alignItems="center"
      height="100vh"
    >
      <Flex
        direction="column"
        w={{ base: '100%', md: '30%', lg: '40%' }}
        mt={10}
      >
        <Heading
          as="h1"
          fontFamily="Bangers, cursive"
          fontSize={{ base: '7xl', lg: '9xl' }}
          letterSpacing="wide"
          lineHeight="base"
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
          w="50%"
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
      </Flex>
      {data?.allPost && (
        <Carousel
          w={{ base: '90%', md: '60%', lg: '40%' }}
          h={{ base: 'auto', md: '360px', lg: '420px' }}
          slides={createSlides(data)}
          interval={10000}
        />
      )}
    </Flex>
  );
}
