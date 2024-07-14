const db = require('../models/index.js');
const path = require('path');
const multer  = require('multer');

const authenticateUser = async (req, res, next) => {
    const user_id = req.cookies.user_id;
    if(!user_id){
        return res.status(401).json({message: 'Unauthorized', isAuthenticated: false});
    }
    try {
        console.log('Inside authenticateUser Part-1');
        req.current_user = await db.User.findOne({where: {id: user_id}});
        console.log('Inside authenticateUser Part-2');
        next();
    } catch (error) {
        res.status(401).send('Invalid User' + error);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-user_id-' + req.cookies.user_id + ext);
    },
});

const upload = multer({ storage });

const setImageHeaders = (req, res, next) => {
    if (req.path.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    //   res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your frontend domain
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      // Set the correct content type based on file extension
      const ext = req.path.split('.').pop().toLowerCase();
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          res.type('image/jpeg');
          break;
        case 'png':
          res.type('image/png');
          break;
        case 'gif':
          res.type('image/gif');
          break;
        case 'svg':
          res.type('image/svg+xml');
          break;
      }
    }
    next();
};

module.exports = {authenticateUser, upload, setImageHeaders }