const multer = require('multer');

function uploadFiles() {
  console.log('UPLOAD');
  const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (_req, file, cb) {
      console.log('file.originalname', file.originalname);
      cb(null, file.originalname);
    },
  });

  // const upload = multer({ storage: storage }).array('input-file');
  const upload = multer({ storage: storage });

  return upload;
}

module.exports = uploadFiles;
