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
	getProjectByID(req, res, next) {
		Project
			.findOne({_id: req.query._id})
			.populate('user', 'owner')
			.lean()
			.exec((error, project) => {
				if(error) {}
				res.json(project)
			})
	},
	getProjects (req, res, next) {
		data = initProjects();
		res.json(data);
	},
	newProject (req, res, next) {
		const project = new Project({name: req.query.name, owner: req.user._id});
		project.save((error, saved) => {

			if(error) {
				res.json({error})
			} else {

				Project
					.findOne({_id: saved._id})
					.populate('owner')
					.lean()
					.exec((err, doc) => {
						res.json(doc)
					})
			}
		})
	},
	deleteProject (req, res, next) {
		Project.remove({_id: req.query._id}).exec((error) => {
			if(error) { res.json({ error: error }) }
			else { res.json({status: 'ok'}); }
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
