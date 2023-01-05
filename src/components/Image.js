import React from 'react';
import { Box, Image as ChakraImage } from '@chakra-ui/react';

import imageFetch from '@utils/image-fetch';

export default function Image({
  // Cloudinary Props
  publicId,
  width,
  height,

  // Next Image props
  src,
  alt,
  crop,
  // Everything else
  ...rest
}) {
  const cldUrl = imageFetch(publicId, { w: width, h: height, crop, ...rest });
  return (
    <Box pos="relative">
      <ChakraImage
        quality={rest.quality ? rest.quality : 100}
        src={cldUrl}
        width={width}
        height={height}
        placeholder="blur"
        alt={alt}
        {...rest}
      />
    </Box>
  );
}
