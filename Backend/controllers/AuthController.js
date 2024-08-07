const { getUserByEmail, userLogin } = require('../services/AuthService.js');

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
    try {
        const { email, password } = req.body;
    
        const User = await userLogin(email, password);
    
        if(User.error){
            return res.status(401).json({error: User.error});
        }
        res.cookie('user_id', User.id, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'None',
        });
        res.status(200).json({message: 'Logged in succesffuly.', User});
    } catch (error) {
        res.status(500).json({error: 'Internal Error Occurred' + error});
    }
}

const auth = (req, res) => {
    res.status(200).json({isAuthenticated: true});
}

const logout = async (req, res) => {
    res.clearCookie('user_id', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(200).json({message: 'Logged out succesffuly.', success: true});
}

module.exports = {isEmailAvailable, login, auth, logout}