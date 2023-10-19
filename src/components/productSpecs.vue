<template>
	<div class="col-sm-12 productName" style="">
		<div class="product-attributes">
			<div v-for="(specArr, i) in prodSpec" :key="i" :id="'attr' + i" class="attr-wrapper">
				<!-- <h3>{{ i }}{{ prodSpec[i] }}</h3> -->
				<div v-for="(specAttr, id) in prodSpec[i]" :key="id" :id="'attrID' + i" class="attr-group">
					<h2 :class="'attrTitle' + [id] + ' subtitle'">{{ specAttr.group }}</h2>
					<div class="attr-name">{{ specAttr.attr_name }}</div>
					<div class="attr-value">{{ specAttr.attr_value }}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: 'productSpec',
	data() {
		return {
			prodSpec: {},
			errorData: [],
			url: 'http://localhost:8000/products/product/'
		}
	},
	

	methods: {
		async getSpec() {
			let curId = this.$route.params.id;
			await axios.get(this.url + curId) // eslint-disable-next-line 
				.then(response => {
					this.prodSpec = [];
					// response.data.evrika.spec.forEach(element => {
					// 	this.prodSpec.push(element);
					// });
					const objArr = this.prodSpec = {};
					response.data.evrika.spec.forEach(item => {
						if (objArr[item[0]]) {
							objArr[item[0]].push({
								"group": item[1],
								"attr_name": item[2],
								"attr_value": item[3]
							});
						} else {
							objArr[item[0]] = [{
								"group": item[1],
								"attr_name": item[2],
								"attr_value": item[3]
							}]
						}
					});
				})

				.catch((error) => {
					this.promoData = {
						"message": 'Акции на данный момент отсутсвуют'
					}
					console.log(error);
					this.errorData.push(error)
				});
		},

	},
	created() {
		this.getSpec();

	}
}
</script>
<style scoped>
.subtitle:not(.attrTitle0) {
	display: none;
}
#attr8{
	order:-1
}
.product-attributes {
  display: flex;
  flex-flow: column;
}
.attr-group .subtitle {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 15px;
  width: 100%;
}
.attr-group {
  display: flex;
  flex-flow: row wrap;
  column-gap: 20px;
}
.attr-name, .attr-value {
  width: calc(50% - 10px);
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
}
.attr-name {
  color: #666;
}
.attr-group + .attr-group {
  margin-top: 15px;
}
.attr-wrapper {
  margin: 0 0 40px;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
