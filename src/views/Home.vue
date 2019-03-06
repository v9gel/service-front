<template>
  <div>
    <router-link to="/login">Страница входа</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default {
  name: 'home',
  components: {
    Sidebar,
    Navbar,
    HelloWorld
  }
}
</script>

<style>


</style>
