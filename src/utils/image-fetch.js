import { useImage } from 'use-cloudinary';

function ImageFetch(src, options = {}) {
  const { generateImageUrl } = useImage('mediadevs');

  const { w, h } = options;

  const transformation = [
    {
      format: 'auto',
      quality: 'auto',
    },
  ];

  if (w || h) {
    const size = {};

    if (w) {
      size.width = w;
    }

    if (h) {
      size.height = h;
    }

    transformation.push({
      crop: 'fill',
      ...size,
    });
  }

  return !src
    ? undefined
    : generateImageUrl({
        delivery: {
          publicId: src,
          storageType: 'fetch',
        },
        transformation,
      });
}

export default ImageFetch;
