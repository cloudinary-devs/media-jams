import React from 'react';
import { cloudinaryLoader } from 'next-cloudinary';
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
  const imageProps = {
    width,
    src: publicId,
    deliveryType: 'fetch',
  };

  const loaderOptions = {
    width,
    src: publicId,
    overlays: [...transformations],
  };

  const cldOptions = {};

  const result = cloudinaryLoader({
    loaderOptions,
    imageProps,
    cldOptions,
  });
  console.log('Resulting URL>>>', result);
  return (
    result && (
      <Box pos="relative">
        <ChakraImage
          quality={rest.quality ? rest.quality : 100}
          objectFit="cover"
          src={result}
          w="auto"
          h="auto"
          width={width}
          height={height}
          placeholder="blur"
          blurDataURL={result}
          alt={alt}
          {...rest}
        />
      </Box>
    )
  );
}
