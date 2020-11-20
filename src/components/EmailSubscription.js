import {
  Text,
  Center,
  Heading,
  Button,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

export default function EmailSubscription() {
  return (
    <VStack mb={16}>
      <Center>
        <Heading mt={16} mx={16} textStyle="headline-interestitial">
          Keep up with all the Jams
        </Heading>
      </Center>
      <Center maxWidth="2xl">
        There’s always something new happening in the world of media. Our Media
        Developer Experts are always pushing new horizons. If you want to stay
        up to date, get weekly updates in your inbox.
      </Center>
      <InputGroup mt={12} maxWidth="lg">
        <Input
          variant="filled"
          placeholder="Enter your email for updates ..."
        />
        <InputRightElement height="100%" width="25%">
          <Button size="sm" colorScheme="blue" onClick={() => {}}>
            <Text color="white">Subscribe</Text>
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
}
