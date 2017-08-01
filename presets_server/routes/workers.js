const fs = require('fs');
const path = require('path');
const projectsDir = path.join(__dirname, '../public/downloads'); 
const _ = require('lodash');
const async = require('async');
const Project = require('../models/Project').Project

function initProjects() {
	let arr = [];
	let regex = /[^\D]+[^.]/;
	let ids = fs.readdirSync(projectsDir);
	_.each(ids, n => { 
		let str = regex.exec(n);
		arr.push(str[0]);
	});
	return arr;
}

function getRandomId () {
	return Math.random(16).toString().slice(2)
} 

module.exports =  {

	getProjects (req, res, next) {
		data = initProjects();
		res.json(data);
	},
	newProject (req, res, next) {
		console.log("req.query: ", req.query, req.body);
		const project = new Project({name: req.query.name});
		project.save(error => {
			if(error) {
				res.json({error})
			} else {
				res.json(project)
			}
		})
	},
	deleteProject (req, res, next) {
		let filename = JSON.parse(req.body.project);
		fs.unlink(`${projectsDir}\\config_${filename}.less`, function (err) {
	    if (err) throw err;
	    res.send('file deleted')
		});
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
