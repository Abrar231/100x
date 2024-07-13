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

module.exports = {authenticateUser, upload, }