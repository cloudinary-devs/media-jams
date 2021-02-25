import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { Carousel, Slide } from '@components/Carousel';
import Image from '@components/Image';

import Link from 'next/link';

export default function Hero() {
  const featuredPosts = [
    {
      author: {
        name: 'Domitrius Clark',
        image: {
          asset: {
            url:
              'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
          },
        },
      },
      slug: {
        current: 'it-a-post',
      },
      title: 'Responsive images in React',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
      tags: ['react'],
    },
    {
      author: {
        name: 'Domitrius Clark',
        image: {
          asset: {
            url:
              'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
          },
        },
      },
      slug: {
        current: 'it-a-post',
      },
      title: 'Responsive images in React',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
      tags: ['react'],
    },
    {
      author: {
        name: 'Domitrius Clark',
        image: {
          asset: {
            url:
              'https://cdn.sanity.io/images/5ad74sb4/stage/e5809d2c25c5ee4512190d436c366ef18eb48c75-2316x3088.jpg',
          },
        },
      },
      slug: {
        current: 'it-a-post',
      },
      title: 'Responsive images in React',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed convallis tristique sem. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Morbi in ipsum sit amet pede facilisis laoreet.',
      tags: ['react'],
    },
  ];

  function createSlides(jams) {
    const slides = [];

    const colors = ['blue', 'red', 'green'];

    function pickRandomColor(arr) {
      return Math.floor(Math.random() * arr.length);
    }

    jams.map((jam) => {
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
          >
            <Button
              size="sm"
              alignSelf="flex-start"
              width="10%"
              colorScheme={color}
            >
              Learn
            </Button>
            <Box>
              <Heading color={`${color}.600`}>{jam.author.name}</Heading>
              <Heading size="md" as="h6" color={`${color}.600`}>
                {jam.title}
              </Heading>
              <Text color={`${color}.400`}>{jam.description}</Text>
            </Box>
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
      <Carousel slides={createSlides(featuredPosts)} interval={10000} />
    </Flex>
  );
}
