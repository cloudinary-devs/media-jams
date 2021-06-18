import NextImage from 'next/image';
import { chakra, useStyleConfig } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { buildImageUrl } from 'cloudinary-build-url';
import useBlurredPlaceholder from '@hooks/useBlurredPlaceholder';

const isUrl = (string) =>
  string.match(
    /^(ht|f)tps?:\/\/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|\\^[\]`]+)?$/,
  );

function decideStorageDefault(string) {
  if (isUrl(string)) {
    return 'fetch';
  } else {
    return 'upload';
  }
}

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
  const {
    blurredPlaceholderUrl,
    supportsLazyLoading,
    ref,
    inView,
  } = useBlurredPlaceholder(cloudName ? cloudName : '');

  const cloudinaryUrl =
    cloudName &&
    buildImageUrl(publicId, {
      cloud: {
        cloudName,
        storageType: storageType ? storageType : decideStorageDefault(publicId),
      },
      transformations: {
        ...transforms,
      },
    });

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
              className={className}
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
        unoptimized={unoptimized}
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
