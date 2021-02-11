import { Flex } from '@chakra-ui/react';
import Image from '@components/Image';

export default function Footer() {
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
      <Image
        cloudName="mediadevs"
        publicId="mediajams/logo"
        height={60}
        width={120}
        alt="MediaJams logo"
      />
    </Flex>
  );
}
