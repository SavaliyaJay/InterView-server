const express = require('express');
const router = express.Router();

const {
    userRegister,
    userLogin
} = require('../Controllers/user.controller');

router.get('/routeCheck', (req, res) => {
    res.send('this is user route');
});

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);

module.exports = router;