import React from 'react';
import { HStack, Box, Button, Flex, Image, Text, Menu } from '@chakra-ui/react';
import SearchInput from '@components/SearchInput';

import { useImage } from 'use-cloudinary';

export default function SideNav({ children }) {
  const [searchValue, setSearchValue] = React.useState('');

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
      w={{ base: 600, xl: 800 }}
      direction="column"
      border="1px solid black "
    >
      <Flex
        w="100%"
        direction="column"
        height={200}
        borderBottom="2px solid black"
        background="grey.900"
        justifyContent="space-between"
      >
        <Flex justifyContent="space-between">
          <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
          <HStack spacing="2">
            <Button colorScheme="blue">Log In</Button>
            <Text mr={5} color="blue.400" as="u">
              Sign Up
            </Text>
          </HStack>
        </Flex>
        <SearchInput
          searchvalue={searchValue}
          setSearchValue={setSearchValue}
          alignSelf="center"
          w="95%"
          mb={5}
        />
      </Flex>
      {children}
    </Flex>
  );
}
