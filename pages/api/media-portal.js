import { promisify } from 'util';
import { initSentry, sentryHandler } from '@lib/sentry';
import initMiddleware from '@lib/init-middleware';
import auth0 from '@lib/auth0';
import multer from 'multer';
import streamifier from 'streamifier';
const cloudinary = require('cloudinary').v2;

// initialize multer for buffer or in memory storage
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
  // Run cors-middle
  upload.single('image')(req, {}, async (err) => {
    // do error handling here
    streamifier.createReadStream(req.file.buffer).pipe(
      cloudinary.uploader.upload_stream(
        {
          folder: req.body.folder,
        },
        function (error, result) {
          if (error) res.status(500).send(error);
          res.status(200).send(result);
          res.end();
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
