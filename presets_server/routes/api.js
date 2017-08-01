var express = require('express');
var router = express.Router();
const { saveConfig, getProjects, newProject, deleteProject, getProjectByID } = require('./workers');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.post('/saveconfig', saveConfig);
router.get('/saveconfig', saveConfig);

router.get('/projects', getProjects);
router.get('/new', ensureAuthenticated, newProject);
router.get('/delete', ensureAuthenticated, deleteProject);

router.get('/project', getProjectByID);


function ensureAuthenticated(req, res, next) {
  if(req.user) {
  	return next()
  } else {
  	const err = new Error('no Authorize');
  	err.status = 403;
  	next(err);
  }
}


module.exports = router;
