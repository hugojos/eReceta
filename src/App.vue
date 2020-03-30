<template>
  <div id="app" class="vh-100">
    <header-component/>
    <div class="container d-flex justify-content-center align-items-center">
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
    padding-top: 45px;
  }  
</style>
