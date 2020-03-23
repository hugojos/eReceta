<template>
  <div id="app" class="vh-100">
    <header-component style="height:5%"/>
    <div class="container" style="height:95%">
      <router-view/>
    </div>
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
  }

</style>
