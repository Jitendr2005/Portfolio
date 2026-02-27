const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const auth = require('../middleware/auth');

router.get('/', certificateController.getAllCertificates);
router.post('/', auth, certificateController.createCertificate);
router.delete('/:id', auth, certificateController.deleteCertificate);

module.exports = router; 