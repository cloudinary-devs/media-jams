import React from 'react';
import { cloudinaryLoader, CldImage } from 'next-cloudinary';
import { Box, Image as ChakraImage } from '@chakra-ui/react';

export default function Image({
  // Cloudinary Props
  publicId,
  transformations = [],
  cloudName,
  storageType,

  // Next Image props
  src,
  width,
  height,
  alt,

  // Everything else
  ...rest
}) {
  return (
    <Box pos="relative">
      <CldImage
        quality={rest.quality ? rest.quality : 100}
        objectFit="cover"
        deliveryType="fetch"
        src={publicId}
        w="auto"
        h="auto"
        width={width}
        height={height}
        placeholder="blur"
        alt={alt}
        {...rest}
      />
    </Box>
  );
}
