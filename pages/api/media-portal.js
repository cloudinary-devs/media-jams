import { initSentry, sentryHandler } from '@lib/sentry';
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// initialize Sentry
initSentry();
// cloudinary intialization
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config({
  cloud_name: 'jesse-thisdot',
  api_key: '152712524636259',
  api_secret: '2zOS-xYzT4apnP4UtyK4d6EM4kY',
});
// const { writeStream, promise } = uploadStream({Bucket: 'yourbucket', Key: 'yourfile.mp4'});
// const readStream = fs.createReadStream('/path/to/yourfile.mp4');
// const uploadedImage = await cloudinary.uploader.upload('pizza.jpg', {
//   tags: '',
// });

// const pipeline = readStream.pipe(writeStream);
export default async (req, res) => {
  // File upload
  let cloudinaryUploadStream = cloudinary.uploader.upload_stream(
    {
      folder: `sample`,
    },
    function (error, result) {
      console.log(error, result);
    },
  );
  req.pipe(cloudinaryUploadStream);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
