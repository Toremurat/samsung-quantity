<template>
	<div class="promo-wrapper">
		<div class="product-wrapper">
			<div class="top-section">
				<div class="row top-part">
					<productImg />
					<productName />
					<div class="tabs-nav">
						<div class="tab-link" :class="{ active: specs }" @click="specsActive(); relatedActive()">
							Характеристики
						</div>
						<div class="tab-link" :class="{ active: related }" @click="relatedActive(); specsActive()">
							Другие товары
						</div>
					</div>
					<div class="tab-wrapper">
						<div class="tab-item" :class="{ activeTab: specs }" id="tab1">
							<productSpecs />
						</div>
						<div class="tab-item" :class="{ activeTab: related }" id="tab2">
							<productRelated />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import productImg from '@/components/productImg.vue'
import productName from '@/components/productName.vue'
import productSpecs from '@/components/productSpecs.vue'
import productRelated from '@/components/relatedProducts.vue'
export default {
	name: 'productPage',
	components: {
		productImg,
		productName,
		productSpecs,
		productRelated,
	},
	props: {
		productId: Number,
	},
	data() {
		return {
			specs: true,
			related: false,
		}
	},
	methods: {
		specsActive() {
			this.specs = !this.specs
		},
		relatedActive() {
			this.related = !this.related
		}
	}
}
</script>
<style scoped>
.row.top-part {
	display: flex;
	margin: 0 auto;
	gap: 40px;
}

.tab-item {
	visibility: hidden;
	transition: ease all .3s;
	position: absolute;
	top: 0;
	opacity: 0;
	height: 0;
	z-index: 1;
	background: #fff
}

.tab-item.activeTab {
	visibility: visible;
	transition: all .3s ease;
	position: relative;
	opacity: 1;
	height: 100%;
	z-index: 2
}

.tab-wrapper {
	position: relative;
	overflow: hidden;
	padding: 0;
}


.tab-link {
	font-weight: 700;
	font-size: 17px;
	line-height: 20px;
	color: #000;
	position: relative;
	border-bottom: 2px solid transparent;
	padding: 0 0 5px;
	cursor: pointer
}

.tab-link.active {
	color: #2189ff;
	border-color: #2189FF;
}

.tabs-nav {
	display: flex;
	flex-flow: row nowrap;
	gap: 40px;
	padding: 0;
	margin-top: 60px;
}

.tab-wrapper {
	max-width: 600px;
}

.attr-wrapper {
	margin-bottom: 40px;
}</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
