const express =  require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
//home route
router.get('/', homeController.home);

console.log("Router is up");
module.exports = router;