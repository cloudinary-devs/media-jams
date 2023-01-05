import { constructCloudinaryUrl } from 'next-cloudinary';

function imageFetch(src, options = {}, ...props) {
  const { w, h, crop } = options;
  const { cld } = props;
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
          crop: crop || 'fit',
          width: size.width,
          height: size.height,
          ...cld,
        },
      });
}

export default imageFetch;
