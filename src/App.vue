<template>
  <div id="app">
      <div v-if="this.$route.name != 'login'">
          <Navbar></Navbar>
          <el-row class="tac">
              <el-col :span="3">
                  <Sidebar></Sidebar>
              </el-col>
              <el-col :span="21">
                  <router-view/>
              </el-col>
          </el-row>
      </div>
      <div v-else>
          <Login></Login>
      </div>
  </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import Navbar from "@/components/Navbar";
    import Sidebar from "@/components/Sidebar";
    import Login from "./views/Login";

    export default {
        name: 'app',
        components: {
            Login,
            Sidebar,
            Navbar,
            HelloWorld
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

    body {
        margin: 0px;
    }
</style>
