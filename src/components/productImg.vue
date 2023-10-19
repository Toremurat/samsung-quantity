<template>
	<div class="col-sm-8 slider" v-if="prodImg.length">
		<div class="glide" id="prod">
			<div class="glide__track" data-glide-el="track">
				<ul class="glide__slides">
					<li class="glide-item" v-for="(slides, index) in prodImg" :key="index">
						<img :src="'https://cdn.evrika.com/storage/products/images/medium/' + slides.img" alt="">
					</li>
				</ul>
			</div>
			<div class="glide__bullets" data-glide-el="controls[nav]" >
				<button class="glide__bullet" :data-glide-dir=" '=' + i " :alt="bullets.img" v-for="(bullets, i) in prodImg" :key="i"></button>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import Glide from '@glidejs/glide'
export default {
	name: 'productImg',
	data() {
		return {
			prodImg: {},
			errorData: [],
			data: [],
			url: 'http://localhost:8000/products/product/'
		}
	},
	methods: {
		async getImg() {
			let curId = this.$route.params.id;
			await axios.get(this.url + curId)
				.then(response => {
					this.prodImg = [];
					response.data.evrika.images.forEach(element => {
						this.prodImg.push({
							"img": element,
						});
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
		async fetchData() {
			await new Promise(r => setTimeout(r, 2000));
			const newData = this.prodImg;
			this.data = newData;
		}

	},
	watch: {
		data: function () {
			new Glide('.glide').mount();
		}
	},
	created() {
		this.getImg();

	},
	mounted() {
		this.fetchData();
		// new Glide('.glide').mount()
		// this.loadedAxiosDOM()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';
.col-sm-8.slider {
  width: 600px;
  position: relative;
  max-height: 450px;
  padding: 0;
}
.col-sm-4.productName {
  flex-basis: 320px;
  max-width: 320px;
  padding: 0;
}
.glide img {
  height: 100%;
}
#prod .glide__track {
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  height: 100% !important;
  width: 100% !important;
}
#prod .glide-item {
  text-align: center;
  height: 450px;
	min-height: 450px;
	min-width: 600px;
  display: flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  padding: 20px 0;
}
#prod .glide__bullets {
  top: calc(100% + 10px);
  position: absolute;
  z-index: 2;
  bottom: 2em;
  left: 50%;
  display: inline-flex;
  list-style: none;
  transform: translateX(-50%);
}
#prod .glide__bullet {
  background: #d9d9d9;
  width: 10px;
  height: 10px;
  box-shadow: none;
  border: none;
  padding: 0;
	border-radius: 50%;
	transition: all 100ms ease-in-out;
	line-height: 0;
	margin: 0 0.25em;
}
#prod .glide__bullet.glide__bullet--active {
  background: #2189ff;
}
</style>