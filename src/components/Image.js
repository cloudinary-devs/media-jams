import React from 'react';
import NextImage from 'next/image';
import { useImage } from 'use-cloudinary';
import { Box, chakra } from '@chakra-ui/react';

const shimmer = (w, h) => {
  const svg = `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#E883ED" offset="20%" />
          <stop stop-color="#FCA685" offset="50%" />
          <stop stop-color="#E883ED" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;
  return svg;
};

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const ChakraNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'unoptimized',
      'onError',
    ].includes(prop),
});

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
  fallback,
  ...rest
}) {
  const [imageSrc, setImageSrc] = React.useState('');
  const { generateImageUrl } = useImage(cloudName);

  React.useEffect(() => {
    if (cloudName && publicId) {
      // This is checking for a local fallback in the publicId
      if (publicId.indexOf('/') > -1) {
        setImageSrc(publicId);
      } else {
        setImageSrc(
          generateImageUrl({
            delivery: {
              publicId,
              storageType: storageType ? storageType : 'upload',
            },

            // Auto apply crop to size provided by width & height props
            transformation: [
              // Auto apply best format and quality transformations -- tweak where needed
              {
                format: 'auto',
                quality: 'auto',
              },
              ...transformations,
            ],
          }),
        );
      }
    } else if (src) {
      setImageSrc(src);
    } else if (!src && !publicId) {
      setImageSrc(fallback);
    }
  }, []);

  return imageSrc ? (
    <Box pos="relative" cursor="pointer">
      <ChakraNextImage
        src={imageSrc}
        w="auto"
        h="auto"
        width={width}
        height={height}
        // placeholder="blur"
        // blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(60, 60))}`}
        alt={alt}
        onError={() => setImageSrc(fallback)}
        {...rest}
      />
    </Box>
  ) : (
    ''
  );
}
