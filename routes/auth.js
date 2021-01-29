const express = require('express'),
    router = express.Router();
const { userSignupValidator,passwordResetValidator  } = require('../validator');
const { signup, signin, signout,
    forgotPassword,
    resetPassword } = require('../controllers/auth');
const { userById } = require('../controllers/user');


 
// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);



router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param("userId", userById);


module.exports = router;