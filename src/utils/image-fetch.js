import { useImage } from 'use-cloudinary';

const defaultOptions = { w: 64, h: 64 };

function ImageFetch(src, options = defaultOptions) {
  const { generateImageUrl } = useImage('mediadevs');

  const { w = 64, h = 64 } = options;
  return !src
    ? undefined
    : generateImageUrl({
        delivery: {
          publicId: src,
          storageType: 'fetch',
        },
        transformation: [
          {
            crop: 'fill',
            width: w,
            height: h,
          },
        ],
      });
}

export default ImageFetch;
