<template>
	Product view
	<div class="search-form">
		<input type="search" name="Search product" id="#searchForm" v-model="productSearchParam" @input="this.searchResult()">
		<div class="dropdownList searchResults">
			<ul class="list-unstyled">
				<li class="product list-item" v-if="this.productSearchParam != ''">
					<div v-for="(searchItems, i) in searchData" :key="i" class="searchItemWrapper"  :id="'search' + i">
						<router-link :to="'/products/product/' + searchItems.id">
							{{ searchItems.type + ' | ' + searchItems.model }}
						</router-link>

					</div>
				</li>
			</ul>
		</div>
	</div>
	<div class="product-wrapper" :id="$route.path">
		<productView :key="$route.path" />
	</div>
</template>
<script>
import productView from '@/views/productView.vue'
import axios from 'axios'
export default {
	name: 'productSearch',
	components: {
		productView,
	},
	data() {
		return {
			url: 'http://localhost:8000/api/getProducts/',
			productSearchParam: '',
			searchData: {},
			errorData: [],
		}
	},
	methods: {
		async searchResult() {
			let paramVal = this.productSearchParam;
			await axios.get(this.url + `?search=` + paramVal )
				.then(response => {
					this.searchData = [];
					response.data.forEach(element => {
						this.searchData.push({
							"id": element.product.id,
							"type": element.text,// eslint-disable-next-line
							"model": element.product.model,
						});
					});
				})

				.catch((error) => {
					this.searchData = {
						"message": 'Error with axios'
					}
					console.log(error);
					this.errorData.push(error)
				});
			console.log(this.searchData)
		},
	},
	created() {
		this.searchResult();
	}
}
</script>
<style scoped></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
