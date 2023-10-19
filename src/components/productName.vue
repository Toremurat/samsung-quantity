<template>
	<div class="col-sm-4 productName" style="">
		<div class="Prod" v-if="prodData">
			<h2 v-html="prodData.text + ` ` + prodData.model"> </h2>
			<div class="pricing-block">
				<div class="new-price" v-html=" prodData.prp  + `<small>₸</small>`"></div>
				<div class="additional-price" v-if="prodData.oldPrice">
					<div class="difference" v-html="prodData.diff + `%`"></div>
					<div class="old-price" v-html="prodData.rrp + `<small>₸</small>`"></div>
				</div>
			</div>
			<div class="quantity-block">
				<h3>
					Наличие
				</h3>
				<div class="store-stock">
					<div class="store-quantity" v-html="prodData.quantity1">
					</div>
					<label class="quantity">
						В магазине
					</label>
				</div>
				<div class="remote-stock">
					<div class="store-quantity" v-html="prodData.quantity2">
					</div>
					<label class="quantity">
						На складе
					</label>
				</div>
			</div>
			<div class="exchange" v-html="prodData.exchange">
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	name: 'productName',
	data() {
		return {
			prodData: {},
			errorData: [],
			exchangeFilter: '',
			url: 'http://localhost:8000/products/product/'
		}
	},
	methods: {
		async getData() {
			let curId = this.$route.params.id;
			await axios.get(this.url + curId) // eslint-disable-next-line 
				.then(response => {
					this.prodData = [];
					let itemData = response.data.description[0];
					this.prodData = {
						"text": itemData.text,
						"model": itemData.product.model,
						"code": itemData.product.code,
						"rrp": itemData.product.rrp.toLocaleString(),
						"prp": itemData.product.prp.toLocaleString(),
						"oldPrice": itemData.product.prp != itemData.product.rrp,
						"diff": (((itemData.product.prp - itemData.product.rrp) / itemData.product.rrp) * 100).toFixed(0),
						"quantity1": response.data.quantity[1].quantity,
						"quantity2": response.data.quantity[0].quantity,
						"exchange": response.data.time_exchange,

					}
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
		this.getData();
	},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Prod > h2 {
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  margin: 0;
}
.new-price {
	font-weight: 700;
	font-size: 37px;
	line-height: 44px;
	color: #2189ff;
	height: auto;
}

.additional-price {
	margin-top: 10px;
	display: flex;
	-webkit-flex-flow: row nowrap;
	-webkit-align-items: center;
	gap: 15px;
}
.pricing-block {
  margin-top: 30px;
}
.additional-price .difference {
	font-weight: 700;
	font-size: 20px;
	line-height: 26px;
	color: #ffffff;
	padding: 5px 10px;
	border-radius: 25px;
	background: #2189ff;
}

.additional-price .old-price {
	font-weight: 400;
	font-size: 27px;
	line-height: 32px;
	color: #666666;
	position: relative;
}
.additional-price .old-price:after {
	content: '';
	display: block;
	position: absolute;
	height: 1px;
	width: 100%;
	background: #2189ff;
	top: 50%;
}
.quantity-block h3 {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  margin: 40px 0 15px;
}
.quantity-block .store-stock .store-quantity{
	color: #00ae26;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
}
.quantity-block .remote-stock .store-quantity {
  font-weight: 700;
  font-size: 24px;
  line-height: 130%;
  text-align: center;
  color: #ee2626;
}
.quantity-block > div {
  background: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  text-align: center;
  padding: 10px;
}
.quantity-block .remote-stock {
  margin-top: 20px;
}
label.quantity {
  font-weight: 400;
  font-size: 18px;
  line-height: 130%;
}
.exchange {
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #666666;
  margin-top: 20px;
}

</style>
<style>
.exchange span {
  color: #2189ff;
  font-weight: 700;
}
</style>