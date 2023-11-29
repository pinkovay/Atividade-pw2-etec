// Importando multer / middleware
const multer = require('multer');

// filtro para limitação de tipo de arquivo
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif';
  cb(null, isImage);
};

// Definindo o uso do multer
const uploadImage = multer({
  storage: multer.memoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: fileFilter
});

module.exports = uploadImage;