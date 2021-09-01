import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useImage } from 'use-cloudinary';

import useBlurredPlaceholder from '@hooks/useBlurredPlaceholder';

function CloudinaryNextImage({
  // Cloudinary props
  publicId,
  transforms,
  cloudName,
  storageType,
  blurPlaceholder,
  // Next Image props
  src,
  width,
  height,
  alt,
  loading,
  objectFit,
  objectPosition,
  priority,
  quality,
  unoptimized,
  // Chakra -- the rest are fed from the factory function
  container,
  ...rest
}) {
  const { generateImageUrl } = useImage({ cloudName });

  const cloudinaryUrl =
    cloudName &&
    generateImageUrl({
      delivery: {
        publicId,
        storageType: storageType ? storageType : 'upload',
      },
      transformation: [...transforms],
    });

  console.log(cloudinaryUrl);

  const {
    blurredPlaceholderUrl,
    supportsLazyLoading,
    ref,
    inView,
  } = useBlurredPlaceholder(cloudName ? cloudName : '');

  if (blurPlaceholder) {
    return (
      <Box
        ref={!supportsLazyLoading ? ref : undefined}
        sx={{
          width: 'auto',
          background: `no-repeat url(${blurredPlaceholderUrl({
            publicId,
            width,
            height,
          })})`,
          ...container,
        }}
      >
        {inView ||
          (supportsLazyLoading && (
            <NextImage
              src={cloudName ? cloudinaryUrl : src}
              width={width}
              height={height}
              alt={alt}
              loading={loading}
              objectFit={objectFit}
              objectPosition={objectPosition}
              priority={priority}
              quality={quality}
              unoptimized={unoptimized}
            />
          ))}
      </Box>
    );
  } else {
    return (
      <NextImage
        src={cloudName ? cloudinaryUrl : src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        objectFit={objectFit}
        objectPosition={objectPosition}
        priority={priority}
        quality={quality}
        {...rest}
      />
    );
  }
}

const Image = chakra(CloudinaryNextImage, {
  shouldForwardProp: (prop) => {
    return [
      'src',
      'cloudName',
      'publicId',
      'transforms',
      'loading',
      'objectFit',
      'objectPosition',
      'priority',
      'quality',
      'unoptimized',
      'width',
      'height',
      'storageType',
      'alt',
      'blurPlaceholder',
      'container',
    ].includes(prop);
  },
});

export default Image;
