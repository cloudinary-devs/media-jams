import { constructCloudinaryUrl } from 'next-cloudinary';

function ImageFetch(src, options = {}) {
  const { w, h } = options;

  const size = {};
  if (w || h) {
    if (w) {
      size.width = w;
    }

    if (h) {
      size.height = h;
    }
  }

  return !src
    ? undefined
    : constructCloudinaryUrl({
        options: {
          src,
          deliveryType: 'fetch',
          crop: 'fill',
          ...size,
        },
      });
}

export default ImageFetch;
