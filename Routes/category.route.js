const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../Controllers/category.controller');
const { validateTokenForAdmin } = require('../Middleware/validateTokenHandler');

router.get('/routeCheck', (req, res) => {
    res.send('this is category route');
});

// Public
router.route('/').get(getCategories);
router.route('/:id').get(getCategory);

// Only for Admin
router.route('/').post(validateTokenForAdmin, addCategory);
router.route('/:id').put(validateTokenForAdmin, updateCategory);
router.route('/:id').delete(validateTokenForAdmin, deleteCategory);

module.exports = router;