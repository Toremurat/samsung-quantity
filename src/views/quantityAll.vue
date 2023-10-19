<template>
  <div>
    <h1>Список товаров</h1>
    <div class="promoWrapper row">
      <stockItem/>
    </div>
  </div>
</template>
<script>
import stockItem from '@/components/stockItem.vue'
export default {
  name: 'homePage',
  components: {
    stockItem
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>