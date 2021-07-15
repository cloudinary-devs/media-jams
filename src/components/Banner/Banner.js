import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import {
  Flex,
  Button,
  IconButton,
  Heading,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  Author,
  Close,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';
import Feature from './Feature';
import FeatureBlock from './FeatureBlock';
import SignupButton from './SignupButton';

export default function Banner() {
  const [show, setShow] = React.useState(true);
  const { user } = useUser();

  React.useEffect(() => {
    if (user || window.localStorage.getItem('keep-hero-closed')) {
      setShow(false);
    }
  }, [user]);

  return show ? (
    <Flex
      bg="#FFFFFF"
      direction="column"
      h={{ base: 'auto', lg: '420px' }}
      w="100%"
      pb={{ base: 4, lg: 10 }}
    >
      <IconButton
        _hover={{ bg: 'none', outline: 'none' }}
        m={{ base: '0px', lg: '12px' }}
        mt={{ base: '8px', md: 0 }}
        alignSelf="flex-end"
        bg="none"
        outline="none"
        w="auto"
        onClick={() => {
          window.localStorage.setItem('keep-hero-closed', 'true');
          setShow(false);
        }}
        icon={<Close />}
      />
      <Flex
        h="100%"
        w={{ base: '100%', lg: '884px' }}
        direction={{ base: 'column', lg: 'row' }}
        alignSelf="center"
        justify="space-between"
      >
        <Flex ml={{ base: '20px', lg: '0px' }} h="260px" direction="column">
          <Heading mb="17px" variant="H200" letterSpacing="-0.01em">
            Learn Media for Apps
          </Heading>
          <Feature mb="14px">Create notes right in the app</Feature>
          <Feature mb="14px">Bookmark your favorite jams</Feature>
          <Feature>Return to your recent jams</Feature>
          <Flex mt="25px">
            <SignupButton />
            <Button p="6px 32px" borderRadius="8px" bg="primary.200" ml={4}>
              <Text fontWeight="700" variant="B400" color="primary.500">
                Got It
              </Text>
            </Button>
          </Flex>
        </Flex>
        <SimpleGrid
          templateColumns={{
            base: 'repeat(6, 310px)',
            lg: 'repeat(2, minmax(0, 310px))',
          }}
          overflowX={{ base: 'auto', lg: 'none' }}
          spacingY={{ base: 0, lg: 4 }}
          spacingX={5}
          ml={{ base: '20px', lg: '0px' }}
          mr={{ base: '20px', lg: '0px' }}
          w={{ lg: '544px' }}
          mb={{ lg: '17px' }}
        >
          <FeatureBlock
            LeftIcon={Stack}
            header="Bite-size Tutorials"
            text="How-to learning guides, limited in scope and easy to follow"
          />
          <FeatureBlock
            LeftIcon={Code}
            header="Run & Play Sandboxes"
            text="Learn-by-example demox, open code reeady to run & modify"
          />
          <FeatureBlock
            LeftIcon={Author}
            header="Authored by Experts"
            text="Content represents the most advanced dev best practices"
          />
          <FeatureBlock
            LeftIcon={Mashups}
            header="Tech Stack Mashups"
            text="Shows media design patterns for most popular tech stacks"
          />
          <FeatureBlock
            LeftIcon={Video}
            header="Program with Media"
            text="Create, manage, transform, optimize & deliver images/videos"
          />
          <FeatureBlock
            LeftIcon={Pencil}
            header="Practical Use-Cases"
            text="Solutions to media challenges encountered in building apps"
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  ) : null;
}
