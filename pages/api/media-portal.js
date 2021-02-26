import { initSentry, sentryHandler } from '@lib/sentry';
import initMiddleware from '@lib/init-middleware';
import multer from 'multer';
import streamifier from 'streamifier';
import Cors from 'cors';
const cloudinary = require('cloudinary').v2;
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
const whitelist = ['http://localhost:3333', 'https://*.vercel.app'];
// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ['POST'],
    function(origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (!whitelist.includes(origin)) {
        var message = `The CORS policy for this origin doesn't allow access from the particular origin.`;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  }),
);

export default async (req, res) => {
  // Run cors-middle
  await cors(req, res);
  upload.single('image')(req, {}, (err) => {
    // do error handling here
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
