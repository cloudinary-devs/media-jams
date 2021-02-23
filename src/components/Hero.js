import React from 'react';

import { Heading, Flex, Text, Button, Box, IconButton } from '@chakra-ui/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
  function SlideOne() {
    return (
      <Flex w="100%" h="100%" justify="center" align="center" bg="blue.200">
        <Text fontSize="2xl" color="blue.600">
          This is the first slide
        </Text>
      </Flex>
    );
  }

  function SlideTwo() {
    return (
      <Flex w="100%" h="100%" justify="center" align="center" bg="red.200">
        <Text color="red.600" fontSize="2xl">
          This is the second slide
        </Text>
      </Flex>
    );
  }

  function SlideThree() {
    return (
      <Flex w="100%" h="100%" justify="center" align="center" bg="green.200">
        <Text fontSize="2xl" color="green.600">
          This is the third slide
        </Text>
      </Flex>
    );
  }

  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />];
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
          textDecoration="none"
        >
          <Link href="/post">Browse</Link>
        </Button>
      </Flex>
      <Carousel slides={slides} />
    </Flex>
  );
}

function Carousel({ slides }) {
  const [state, dispatch] = React.useReducer(reducer, {
    index: Math.floor(Math.random() * slides.length),
    slides,
    maxSlides: slides.length,
  });

  function reducer(state, action) {
    switch (action.type) {
      case 'NEXT_SLIDE':
        return {
          index: state.index === state.maxSlides - 1 ? 0 : state.index + 1,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
      case 'PREVIOUS_SLIDE':
        return {
          index: state.index === 0 ? state.maxSlides - 1 : state.index - 1,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
      case 'RANDOM_SLIDE':
        return;
      default:
        return {
          index: state.index,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
    }
  }

  let currentSlide = state.slides[state.index];

  return (
    <>
      <Box h="420px" w="50%" mt={8}>
        {currentSlide}
      </Box>
      <Flex mt={3}>
        <IconButton
          mr={7}
          icon={<FaArrowLeft />}
          onClick={() => dispatch({ type: 'PREVIOUS_SLIDE' })}
        >
          Previous
        </IconButton>
        <IconButton
          icon={<FaArrowRight />}
          onClick={() => dispatch({ type: 'NEXT_SLIDE' })}
        >
          Next
        </IconButton>
      </Flex>
    </>
  );
}
