const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
} = require('../Controllers/category.controller');
const { validateTokenForAdmin} = require('../Middleware/validateTokenHandler');


router.use(validateTokenForAdmin);

router.get('/routeCheck', (req, res) => {
    res.send('this is category route');
});
router.route('/').get(getCategories);
router.route('/:id').get(getCategory);
router.route('/').post(addCategory);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;