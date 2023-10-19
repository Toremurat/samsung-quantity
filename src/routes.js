import { createWebHistory, createRouter } from "vue-router";
import quantityAll from "@/views/quantityAll.vue";
import productSearch from "@/views/productsSearch.vue";
import productView from "@/views/productView.vue";

const routes = [
  {
    path: '/stock/',
    name: 'stock products',
    component: quantityAll,
  },
  {
    path: '/products/',
    name: 'productSearch',
    component: productSearch,
    children: [{
      path: '/products/product/:id/',
      name: 'productPage',
      component: productView,
    }]
  },
  // {
  //   path: '/products/:id/',
  //   name: 'productPage',
  //   component: productView,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;