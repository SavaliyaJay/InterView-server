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


router.use(validateTokenForAdmin);

router.get('/routeCheck', (req, res) => {
    res.send('this is subCategory route');
});
router.route('/').get(getSubCategories);
router.route('/:id').get(getSubCategory);
router.route('/category/:id').get(getSubCategoryUsingCategoryId)
router.route('/').post(addSubCategory);
router.route('/:id').put(updateSubCategory);
router.route('/:id').delete(deleteSubCategory);

module.exports = router;