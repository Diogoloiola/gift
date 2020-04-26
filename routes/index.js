const express = require('express');
const index = require('../controllers/index');
const repositorio = require('../controllers/repositorio');

const router = express();

router.get('/', index.home);
router.post('/recuperarDados', repositorio.index);

module.exports = router;