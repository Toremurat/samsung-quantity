<template>
  <!-- <div class="promo-container row stock" v-if="stockCat && stockCat.length > 0"> -->
  <div v-for="item in stockCat" class="category__item" :key="item.id">
    <div class="item__name">{{ item[0].name }}</div>
    <div v-for="value in item" class="category__item" :key="value.id">
      <router-link :to="`/products/product/${value.id}`">
        <div class="item__name"> {{ value.model }}</div>
        <div class="item__name"> {{ value.prp }}</div>
        <div class="item__name"> {{ value.total_quantity }}</div>
      </router-link>
      <br>
    </div>
  </div>
  <div class="null-message">{{ stockData.message }}</div>
  <!-- <div class="null-message" v-if="this.promoError">loading</div> -->
</template>
<script>
import axios from 'axios'

export default {
  // name: 'promosList',
  props: {
    category: Object,
  },
  data() {
    return {
      stockCat: {},
      stockData: [],
      errorData: [],
      isHover: false,
      loadMessage: 'Загрузка...',
      url: this.$axiosUrl
      // url: ''/promo/getPromoList/' + this.promoStatus'
    }
  },
  methods: {
    async getCategory() {
      // await axios.get('/promo/getPromoList/' + this.promoStatus) // eslint-disable-next-line 
      await axios.get('http://localhost:8000/api/getTotalProducts')  // eslint-disable-next-line 
        .then(response => {
          this.stockCat = {};
          response.data.forEach(element => {
            this.stockCat[element.name] = this.stockCat[element.name] || []
            this.stockCat[element.name].push(element)
          });
        })

        .catch((error) => {
          this.stockData = {
            "message": 'Товары на данный момент отсутствуют'
          }
          console.log(error);
          this.errorData.push(error)
        });
    },
    async getStock() {
      // await axios.get('/promo/getPromoList/' + this.promoStatus) // eslint-disable-next-line 
      await axios.get(this.url)  // eslint-disable-next-line 
        .then(response => {
          this.stockData = [];
          response.data.forEach(element => {
            this.stockData.push({
              "name": element.name,
              "id": element.id,
              "model": element.model,
              "price": element.prp,
              "quantity": element.total_quantity,
            });
          });
        })

        .catch((error) => {
          this.stockData = {
            "message": 'Товары на данный момент отсутствуют'
          }
          console.log(error);
          this.errorData.push(error)
        });
    },
    

  },
  created() {
    this.getCategory();
    this.getStock();
  },
  beforeMount() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>