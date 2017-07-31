<template>
	<div>
		<div class="font">
			<h2>Base-font</h2>
			<ul class="font__params">
				<li>
					<span>font-family</span>
					<select v-model="baseFont['font-family']">
				    <option disabled>font-family</option>
				    <option>Times New Roman</option>
				    <option>Arial</option>
				    <option>Calibri</option>
				    <option>Georgia</option>
				    <option>Impact</option>
				    <option>Tahoma</option>
				    <option>Verdana</option>
					</select>
				</li>
				<li>
					<span>font-size</span>
					<input type="text" v-model="baseFont['font-size']">
				</li>
				<li>
					<span>font-weight</span>
					<input type="text" v-model="baseFont['font-weight']"> 
				</li>
				<li>
					<span>line-height</span>
					<input type="text" v-model="baseFont['line-height']">
				</li>
				<li>
					<span>letter-spacing</span>
					<input type="text" v-model="baseFont['letter-spacing']">
				</li>
			</ul>

		</div>
		<div class="font">
			<h2>H1</h2>
			<ul class="font__params">
				<li>
					<span>font-family</span>
					<select v-model="fonts.h1['font-family']">
				    <option disabled>font-family</option>
				    <option>Times New Roman</option>
				    <option>Arial</option>
				    <option>Calibri</option>
				    <option>Georgia</option>
				    <option>Impact</option>
				    <option>Tahoma</option>
				    <option>Verdana</option>
					</select>
				</li>
				<li>
					<span>font-size</span>
					<input type="text" v-model="fonts.h1['font-size']">
				</li>
				<li>
					<span>font-weight</span>
					<input type="text" v-model="fonts.h1['font-weight']"> 
				</li>
				<li>
					<span>line-height</span>
					<input type="text" v-model="fonts.h1['line-height']">
				</li>
				<li>
					<span>letter-spacing</span>
					<input type="text" v-model="fonts.h1['letter-spacing']">
				</li>
			</ul>
		</div>
		<div class="font">
			<h2>H2</h2>
			<ul class="font__params">
				<li>
					<span>font-family</span>
					<select v-model="fonts.h2['font-family']">
				    <option disabled>font-family</option>
				    <option>Times New Roman</option>
				    <option>Arial</option>
				    <option>Calibri</option>
				    <option>Georgia</option>
				    <option>Impact</option>
				    <option>Tahoma</option>
				    <option>Verdana</option>
					</select>
				</li>
				<li>
					<span>font-size</span>
					<input type="text" v-model="fonts.h2['font-size']">
				</li>
				<li>
					<span>font-weight</span>
					<input type="text" v-model="fonts.h2['font-weight']"> 
				</li>
				<li>
					<span>line-height</span>
					<input type="text" v-model="fonts.h2['line-height']">
				</li>
				<li>
					<span>letter-spacing</span>
					<input type="text" v-model="fonts.h2['letter-spacing']">
				</li>
			</ul>
		</div>
		<div class="preview">
			<div class="base-font" :style="{
				'font-family': baseFont['font-family'],
				fontSize: baseFont['font-size']  + 'px',
				'font-weight': baseFont['font-weight'],
				'line-height': baseFont['line-height'] + 'em',
				'letter-spacing': baseFont['letter-spacing'] + 'em',
			}">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
			</div>
			<div class="h1" :style="{
				'font-family': fonts.h1['font-family'],
				fontSize: fonts.h1['font-size']  + 'px',
				'font-weight': fonts.h1['font-weight'],
				'line-height': fonts.h1['line-height'] + 'em',
				'letter-spacing': fonts.h1['letter-spacing'] + 'em',
			}">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
			</div>
			<div class="h2" :style="{
				'font-family': fonts.h2['font-family'],
				fontSize: fonts.h2['font-size']  + 'px',
				'font-weight': fonts.h2['font-weight'],
				'line-height': fonts.h2['line-height'] + 'em',
				'letter-spacing': fonts.h2['letter-spacing'] + 'em',
			}">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
			</div>
		</div>
		<a href="" @click.prevent="saveConfig">Save data</a>
		<a :href="`http://127.0.0.1:3251/downloads/${filename}`" v-if="filename" download>Скачать</a>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				filename: null,
				baseFont: {
					"font-family": "Arial",
					"font-size": 16,
					"font-weight": 400,
					"line-height": 1.2,
					"letter-spacing": 0
				},
				fonts: {
					h1: {
						"font-family": "Arial",
						"font-size": 36,
						"font-weight": 600,
						"line-height": 1.2,
						"letter-spacing": 0
					},
					h2: {
						"font-family": "Arial",
						"font-size": 28,
						"font-weight": 600,
						"line-height": 1.4,
						"letter-spacing": .3
					}
				}
			}
		}, 
		methods: {
			generateLessPart (obj, objName) {
			  let str = '';
	  		for(var key in obj) {
  				if(key == "font-size" && obj[key] != this.baseFont[key]) {
  					obj[key] = `${obj[key] / this.baseFont[key]}em`;
  				}
	  			for(var baseKey in this.baseFont) {
	  				if(key == baseKey && obj[key] == this.baseFont[baseKey]) {
	  					obj[key] = `@base-${baseKey}`;
	  				}; 
	  			}
		    	str += `\t${key}: ${obj[key]};\n`
	  	  };
	  	  str = `${objName} {\n${str}}`
			  return str
			},
			printLessConfig () {
				let result = "";
				for (var key in this.baseFont) {
					result += `@base-${key}: ${this.baseFont[key]};\n`;
				};
		    result += `\n`
		   	for (var obj in this.fonts) {
		    	result += this.generateLessPart(this.fonts[obj], obj);
		    	result += `\n`
		  	};
			  console.log(result);
			},
			saveConfig () {
				const data = {
					baseFont: this.baseFont,
					fonts: this.fonts
				}
				console.log(data)
				this.$http.post('saveconfig',{d: JSON.stringify(data)}, {
					headers: { 
						'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(
					response => {
						this.filename = response.body.file;
					},
					err => {
						console.log(err)
					}
				)  
			}
		}
	}

</script>

<style lang="scss"> 
	body {
		font-size: 16px;
	}
	.font {
		&__params {
			list-style-type: none;
			border: 1px solid black;
			padding: 10px;
			width: 190px;
			li {
				margin-bottom: .5em;
				&:last-child {
					margin-bottom: 0;
				}
			}
			select {
				width: 50px;
				display: inline-block;
			}
			span {
				display: inline-block;
				width: 120px;
				margin-right: -0.25em;
			}
			input {
				width: 50px;
				text-align: center;
				margin-right: -0.25em;
			}
		}
	}
</style>


