<template>
  <div id="main-section">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>

<style>
@import url(http://82.200.245.235:50151/static/css/font/Samsung_Sharp_Sans/style.css);
.container{
  max-width: 960px!important;
}
#main-section > .container{
  padding: 0;
}
#main-section {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}

.container {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 560px) {
  #main-section .container {
    padding: 0 20px;
  }
}
</style>
