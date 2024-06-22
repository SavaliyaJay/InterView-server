const express = require('express');
const router = express.Router();

const { validateTokenForUser } = require('../Middleware/validateTokenHandler');
const { getSuggestedAnswer } = require('../Controllers/suggestion.controller');

router.route('/').get(validateTokenForUser,getSuggestedAnswer);

module.exports = router;