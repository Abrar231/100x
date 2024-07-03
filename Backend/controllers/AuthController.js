const { getHash, getUserByEmail, userLogin } = require('../services/AuthService.js');

const changePassword = async (req, res) => {
    try {
        const {password} = req.body;
        const hashedPassword = await getHash(password);
        res.status(200).json({hashedPassword});
    } catch (error) {
        res.status(500).send('Internal error occurred');
    }
}

const isEmailAvailable = async (req, res) => {
    try {
        const {email} = req.query;
        const User = await getUserByEmail(email);
        if(!!User){
            return res.status(200).json({"valid":false,"msg":"Email has already been taken.","taken":true});
        }
        res.status(200).json({"valid":true,"msg":"Available!","taken":false});
    } catch (error) {
        res.status(500).send('Internal Error Occurred' + error);
    }
}

const login = async (req, res) => {
    console.log('API /login hit');
    const { email, password } = req.body;

    const User = await userLogin(email, password);

    if(User.error){
        return res.status(401).json({error: User.error});
    }
    // res.cookie('user_id', User.id, {
    //     httpOnly: true,
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    // // // },{
    // //     expires: new Date(Date.now() + 86400000), // 1 day
    // //     httpOnly: true,
    // //     secure: true,
    // //     sameSite: 'strict'
    // });
    res.status(200).json({message: 'Logged in succesffuly.', User});
}

const auth = (req, res) => {
    console.log('Inside Auth');
    res.status(200).json({isAuthenticated: true});
}

const logout = async (req, res) => {
    res.clearCookie('user_id');
    res.status(200).json({message: 'Logged out succesffuly.', success: true});
}

module.exports = {changePassword, isEmailAvailable, login, auth, logout}