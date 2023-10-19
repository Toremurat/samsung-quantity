<template>
	<div class="col-sm-12 productName" style="">
		<div class="product-attributes">
			<div v-for="(relatedData, i) in prodRelated" :key="i" class="related-wrapper" :id="'related' + i">
				<div class="image">
					<img :src="relatedData.image" :alt="relatedData.model">
				</div>
				<div class="model" v-html="relatedData.model">
				</div>
				<div class="quantity" v-html="relatedData.stock + ` ` + `<small>шт</small>`">
				</div>
				<div class="price" v-html="relatedData.price.toLocaleString() + `<small>₸</small>`">
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
			prodRelated: {},
			errorData: [],
			url: 'http://localhost:8000/products/product/',
		}
	},
	
	computed: {

	},
	methods: {
		async getRelated() {
			let curId = this.$route.params.id;
			await axios.get(this.url + curId)
				.then(response => {
					this.prodRelated = [];
					response.data.related_products.forEach(element => {
						this.prodRelated.push({
							"item": element,
							"image": element.image,// eslint-disable-next-line
							"model": element.model = element.model.replaceAll(`/(?<=\().*?(?=\))/gm`),
							"stock": element.total_quantity,
							"price": element.prp
						});
					});
				})

				.catch((error) => {
					this.prodSpec = {
						"message": 'Error with axios'
					}
					console.log(error);
					this.errorData.push(error)
				});
				console.log(this.prodRelated)
		},
	},
	created() {
		this.getRelated();
		
	}
}
</script>
<style scoped>
.subtitle:not(.attrTitle0) {
	display: none;
}

.product-attributes {
	display: flex;
	flex-flow: column;
}

.col-sm-12.productName {
	flex-basis: 600px;
	max-width: 600px;
	min-width: 600px;
}

.related-wrapper {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 30px;
	padding: 10px 0;
	cursor: pointer;
	position: relative;
}

.related-wrapper .image {
	width: 60px;
	height: 50px;
	text-align: center;
}

.related-wrapper .image img {
	max-height: 100%;
	margin: auto;
	max-width: 100%;
}

.related-wrapper .model {
	flex-basis: auto;
	flex-grow: 1;
	flex-shrink: 0;
	max-width: 100%;
	width: auto;
	font-weight: 400;
	font-size: 17px;
	max-width: 270px;
	line-height: 120%;
}

.quantity {
	width: 60px;
	font-weight: 700;
	font-size: 17px;
	line-height: 120%;
	color: #00ae26;
}

.price {
	font-weight: 700;
	font-size: 17px;
	line-height: 120%;
	width: 120px;
	text-align: right;
}

small {
	font-size: 80%;
}

.related-wrapper:after {
	content: '';
	width: 100%;
	position: absolute;
	border-bottom: 1px solid #eeeeee;
	top: 100%;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
