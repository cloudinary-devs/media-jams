import { buildImageUrl } from 'cloudinary-build-url';

const defaultOptions = { w: 64, h: 64 };

function ImageFetch(src, options = defaultOptions) {
  const { w = 64, h = 64 } = options;
  return !src
    ? undefined
    : buildImageUrl(src, {
        cloud: {
          cloudName: 'mediadevs',
          storageType: 'fetch',
        },
        transformations: {
          resize: {
            type: 'fill',
            width: w,
            height: h,
          },
        },
      });
}

export default ImageFetch;
