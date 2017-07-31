<template>
	<div>
		<div class="container">
			<div class="projects">
				<div class="projects__list" scroll="scroll">
					<div class="projects__item" v-for="project in projects">	
						<p class="project__name">{{ project }}</p>
						<a href="" class="button__delete" @click.prevent="deleteProject($event)">x</a>
					</div>
				</div>
				<div class="projects__new"> 
					<router-link to="/Font">Новый проект</router-link>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	
export default {
	data() {
		return {
			projects: []
		}
	},
	methods: {
		getProjects() {
			this.$http.get('projects', {
			 	headers: { 
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(
			 	response => {
			 		this.projects = response.body 
			 	},
			 	err => {
			 		console.log(err)
			 	}
			) 
		},
		deleteProject(event) {
			let current = event.target.parentElement.getElementsByClassName("project__name")[0].innerHTML;
			this.$http.post('delete', {project: JSON.stringify(current)}, {
			 	headers: { 
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(
			 	response => {
			 		this.getProjects(); 
			 	},
			 	err => {
			 		console.log(err)
			 	}
			) 
		}
	},
	mounted() {
		this.getProjects();
	}
}

</script>

<style lang="scss" scoped>
	.container * {
		// outline: 1px solid red;
	}
	.projects {
		background: cyan;
		height: 100vh;
		display: flex;
		&__list {
			flex-basis: 50%;
			padding: 60px;
			overflow: auto;
		}
		&__item {
			background: #fff;
			padding: 20px;
			margin-bottom: 40px;
			position: relative;
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__new {
			flex-basis: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.button__delete {
		position: absolute;
			right: 10px;
			top: 10px;
		text-decoration: none;
		color: #000;
	}
</style>