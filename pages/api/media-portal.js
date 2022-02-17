import { withSentry } from '@sentry/nextjs';
import multer from 'multer';
import streamifier from 'streamifier';
const cloudinary = require('cloudinary').v2;

// initialize multer for buffer or in memory storage
let storage = multer.memoryStorage();
let upload = multer({
  storage: storage,
});

// cloudinary intialization
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Key, Content-Type, Date, X-Api-Version',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req, res) => {
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

export default allowCors(withSentry(handler));
export const config = {
  api: {
    bodyParser: false,
  },
};
