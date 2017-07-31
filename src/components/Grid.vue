<template>
	<div>
		<div class="data">
			<input type="text" v-model="margin">
			<input type="text" v-model="gutter">
			<input type="text" v-model="colNumber">
		</div>


		<div class="container" :style="{
			'padding': '0 ' + margin + 'px' 
		}">

			<div class="row" :style="{
				'margin-left': -gutter/2 + 'px',
				'margin-right': -gutter/2 + 'px'
			}">
			
				<div class="col" 
					v-for="col in colNumber"
 					:style="{
						'width': 100/colNumber + '%',
						'padding': '0 ' + gutter/2 + 'px'
					}" > 
					<div class="background"></div>
				</div>


			</div>

		</div>	
	</div>
</template>

<script>
	
export default {
	data () {
		return {
			gutter: 6,
			colNumber: 60,
			margin: 30,
			container: 1080
		}
	}
}

</script>

<style>
	body {
		padding: 0;
		margin: 0;
	}
	.col {
		float: left;
		box-sizing: border-box;
		outline: 1px solid black;
	}
	.background {
		min-height: 500px;
		background: yellow;
	}
	.margin {
		min-height: 500px;
		float: left;
		background: black;
		outline: 1px solid red;
	}
	.row:before {
		display: table;
		content: '';
		clear: both;
	}
	.row:after {
		display: table;
		content: '';
		clear: both;	
	}
</style>
