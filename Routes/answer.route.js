const express = require('express');
const router = express.Router();

const {
    getAnswers,
    getAnswer,
    addAnswer,
    updateAnswer,
    deleteAnswer,
    getQuestionAnswer
} = require('../Controllers/answer.controller');

const { validateTokenForUser } = require('../Middleware/validateTokenHandler');

router.get('/routeCheck', (req, res) => {
    res.send('this is answer route');
});

// Public
router.route('/').get(getAnswers);
router.route('/:id').get(getAnswer);

// Only for User
router.route('/question/:id').get(validateTokenForUser, getQuestionAnswer);
router.route('/').post(validateTokenForUser, addAnswer);
router.route('/:id').put(validateTokenForUser, updateAnswer);
router.route('/:id').delete(validateTokenForUser, deleteAnswer);

module.exports = router;
