import { initSentry, sentryHandler } from '@lib/sentry';
import multer from 'multer';
const cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');
let storage = multer.memoryStorage();
let upload = multer({
  storage: storage,
});
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

export default async (req, res) => {
  upload.single('image')(req, {}, (err) => {
    // do error handling here
    console.log(req.file); // do something with the files here
    streamifier.createReadStream(req.file.buffer).pipe(
      cloudinary.uploader.upload_stream(
        {
          folder: 'sample',
        },
        function (error, result) {
          console.log(error, result);
          res.status(200).send(result);
        },
      ),
    );
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
