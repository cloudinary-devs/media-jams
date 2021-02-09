import NextImage from 'next/image';
import { Image as ChakraImage } from '@chakra-ui/react';
import { buildImageUrl } from 'cloudinary-build-url';
import useBlurredPlaceholder from '../hooks/useBlurredPlaceholder';

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

export default function Image({
  src,
  cloudName,
  publicId,
  transforms,
  width,
  height,
  quality,
  storageType,
  alt,
  lazy,
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
        resize: (width || height) && {
          width: width ? width : null,
          height: height ? height : null,
        },
        ...transforms,
      },
    });

  if (lazy) {
    return (
      <div
        ref={!supportsLazyLoading ? ref : undefined}
        style={{
          width: 'auto',
          background: `no-repeat url(${blurredPlaceholderUrl({
            publicId,
            width,
            height,
          })})`,
        }}
      >
        {inView ||
          (supportsLazyLoading && (
            <ChakraImage
              as={NextImage}
              src={cloudName ? cloudinaryUrl : src}
              width={width}
              height={height}
              quality={quality || 'auto'}
              alt={alt}
              {...rest}
            />
          ))}
      </div>
    );
  } else {
    return (
      <ChakraImage
        as={NextImage}
        src={cloudName ? cloudinaryUrl : src}
        width={width}
        height={height}
        quality={quality || 'auto'}
        alt={alt}
        {...rest}
      />
    );
  }
}
