const express = require('express');
const { signIn, signUp } = require('../controllers/Auth');

/**
 * Router
 * Using Passport
 */
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.send('Success!!');
// });

module.exports = router;
