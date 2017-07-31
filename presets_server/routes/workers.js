const fs = require('fs');
const path = require('path');
const projectsDir = path.join(__dirname, '../public/downloads'); 
const _ = require('lodash');
const async = require('async');

let arr = [];

function initProjects() {
	let regex = /[^\D]+[^.]/;
	let ids = fs.readdirSync(projectsDir);

	_.each(ids, n => { 
		let str = regex.exec(n);
		arr.push(str[0]);
	});
}

function getRandomId () {
	return Math.random(16).toString().slice(2)
} 

initProjects();

module.exports =  {
	getProjects (req, res, next) {
		res.json(arr);
	},
	newProject (req, res, next) {
		res.json({id: getRandomId()})
	},
	deleteProject (req, res, next) {
		let filename = JSON.parse(req.body.project);
		// res.send(filename)
		fs.unlink("config_" + filename + ".less");
		// fs.unlink(filename);
	},
	saveConfig (req, res, next) {
		if(req.body.d) {
			const config = JSON.parse(req.body.d); 
			console.log(req.body.d)
			const filename = path.join(projectsDir, `config_${getRandomId()}.less`);

			fs.writeFile(filename, JSON.stringify(config, null, 4), (err)=>{
				if(err) {res.json(err)} else {
					res.json({file: path.basename(filename)})
				}
			})
		} else { 
			res.json({err: 'no-config'})
		}		
	}

};
