import { buildImageUrl } from 'cloudinary-build-url';
import { Flex, Image } from '@chakra-ui/react';

export default function Footer() {
  const logo = buildImageUrl('mediajams/logo', {
    cloud: { cloudName: 'mediadevs' },
    transformations: { resize: { height: 0.7 } },
  });

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
      <Image alt="MediaJams logo" src={logo} />
    </Flex>
  );
}
