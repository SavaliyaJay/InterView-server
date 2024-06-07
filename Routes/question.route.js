const express = require('express');
const router = express.Router();

const {
    getQuestions,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
} = require('../Controllers/question.controller');

const { validateTokenForAdmin } = require('../Middleware/validateTokenHandler');

router.get('/routeCheck', (req, res) => {
    res.send('this is question route');
});

// Public
router.route('/').get(getQuestions);
router.route('/:id').get(getQuestion);

// Only for Admin
router.route('/').post(validateTokenForAdmin, addQuestion);
router.route('/:id').put(validateTokenForAdmin, updateQuestion);
router.route('/:id').delete(validateTokenForAdmin, deleteQuestion);

module.exports = router;

