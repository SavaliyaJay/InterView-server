const express = require('express');
const router = express.Router();

const {
    getSubCategories,
    getSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryUsingCategoryId
} = require('../Controllers/subCategory.controller');
const { validateTokenForAdmin} = require('../Middleware/validateTokenHandler');

router.get('/routeCheck', (req, res) => {
    res.send('this is subCategory route');
});

// Public
router.route('/').get(getSubCategories);
router.route('/:id').get(getSubCategory);
router.route('/category/:id').get(getSubCategoryUsingCategoryId);

// Only for Admin
router.route('/').post(validateTokenForAdmin, addSubCategory);
router.route('/:id').put(validateTokenForAdmin, updateSubCategory);
router.route('/:id').delete(validateTokenForAdmin, deleteSubCategory);

module.exports = router;