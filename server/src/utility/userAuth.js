/**
 * Middlewares related to authentication 
 */

const nodemailer = require('nodemailer');
const passport = require('passport');

const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const Wallet = require('../models/Wallet');

/* Utility function for checking mail in database */
const isEmailAvailable = async (email) => {
    const user = await User.findByEmail(email);
    if(user) return true;
    return false;
}

/* Sending OTP */
const sendVerificationCode = async (email, code) => {
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER_NAME,
        to: email,
        subject: 'Email confirmation',
        html: `OTP = ${code}`
    };

    transport.sendMail(mailOptions, (error, response) => {
        if(error) throw error;
        console.log(response);
    })
}

/**
 * 
 * TODO: Make signUp process a transaction 
 * 
 */

module.exports.SignUp = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    console.log(req.body);
    
    try{
        const emailAlreadyExist = await isEmailAvailable(email);
        if(emailAlreadyExist){
            return res.status(409).json({
                status: false,
                error: 'Email already registered'
            });
        }

        /* Create wallet, user and verification code in database */

        const wallet = new Wallet({
            coins: {
                bitcoin: 0
            }
        });

        const user = new User({
            email,
            password,
            firstName, 
            lastName,
            wallet: wallet._id,
            watchList: []
        });


        const vc = new VerificationCode({
            accountId: user._id
        })

        
        await sendVerificationCode(email, vc.verificationCode);

        await vc.save();
        await wallet.save();
        await user.save();

        return res.json({
            status: true,
        })

    } catch(e){
        /* Catch server errors only */
        console.log(e);
        res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
    
}

/**
 * TODO: Make VerifyUser as transaction
 */

module.exports.VerifyUser = async (req, res) => {
    const {email, verificationCode} = req.body;

    try{
        const vc = await VerificationCode.findOne({verificationCode});
        if(!vc) {
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code'
            })
        }

        const vcUser = await User.findById(vc.accountId);
        if((!vcUser) || vcUser.email !== email){
            return res.status(406).json({
                status: false,
                error: 'Wrong email or code.'
            })
        } 

        vcUser.isVerified = true;
        await vcUser.save();
    
        /* Delete verification code after verifying */
        await VerificationCode.findByIdAndDelete(vc._id);

        res.json({
            status: true,
        });

    } catch(e){

        console.log(e);
        res.status(500).json({
            status: false,
            error: 'Internal server error'
        })
    }
}

/**
 * 
 * TODO: Delete password when sending user info from database
 * 
 */

module.exports.LogIn = (req, res, next) => {
    console.log('loginRouter')

    passport.authenticate('local', (error, user, info) => {
        if (error) { 
            return res.status(500).json({
                status: false,
                error: info
            })
        }

        if (!user) {
            return res.json({
                status: false, 
                error: info
            }); 
        }

        req.logIn(user, (error) => {
          if (error) {
               return res.status(500).json({
                    status: false,
                    error
               }); 
            }

          return res.status(202).json({
                "user": req.user,
                status: true,
                message: 'Logged in successfully'
          })

        });
      })(req, res, next);

};

module.exports.LogOut = (req, res) => {
    req.logOut();
    res.json({
        status: true,
        message: "Successfully logged out!"
    });
}

module.exports.GetUser = (req, res) => {
    res.json({
        status: true,
        user: req.user
    });
}

module.exports.IsAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({
        status: false,
        "error": "Not authorized!"
    })
}

module.exports.IsVerified = (req, res, next) => {
    if(!req.user.isVerified){
        res.status(403).json({
            status: false, 
            error: 'Not verified'
        })
    }
    next();
}
