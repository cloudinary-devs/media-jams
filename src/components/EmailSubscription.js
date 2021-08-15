import {
  Button,
  chakra,
  Heading,
  Input,
  Stack,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

export default function EmailSubscription(props) {
  return (
    <Box
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      pt="12"
      pb="12"
      px={{ base: '0', md: '8' }}
    >
      <Stack
        justifyContent="center"
        borderRadius={{ base: 0, md: '8' }}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '10', md: '20' }}
        backgroundColor="primary.200"
        px={{ base: '4', md: '8' }}
        py="10"
      >
        <chakra.form {...props} onSubmit={(e) => e.preventDefault()}>
          <Stack textAlign="center" spacing="4">
            <Heading variant="H300">Keep Jammin'</Heading>
            <Text variant="B300">
              Our Media Developer Experts are always pushing new horizons.
            </Text>
            <Stack spacing="4" direction={{ base: 'column', md: 'row' }}>
              <Input
                bg={useColorModeValue('white', 'inherit')}
                placeholder="Enter your email"
                type="email"
                required
                focusBorderColor={useColorModeValue('blue.500', 'blue.300')}
                _placeholder={{
                  opacity: 1,
                  color: useColorModeValue('gray.500', 'whiteAlpha.700'),
                }}
              />
              <Button
                type="submit"
                colorScheme="blue"
                flexShrink={0}
                width={{ base: 'full', md: 'auto' }}
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </chakra.form>
      </Stack>
    </Box>
  );
}
