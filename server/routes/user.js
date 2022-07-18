const express = require('express');
const router = express.Router();
const {getTimeEntries, setTimeEntry} = require('../controller/userController')

router.get('/allentries', getTimeEntries);
router.post('/entry', setTimeEntry);
module.exports = router;