var express = require('express');
var router = express.Router();
const { saveConfig, getProjects, newProject, deleteProject } = require('./workers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/saveconfig', saveConfig);
router.get('/saveconfig', saveConfig);
router.post('/projects', getProjects);
router.get('/projects', getProjects);
router.get('/new', newProject);
router.post('/delete', deleteProject);
router.get('/delete', deleteProject);

module.exports = router;
