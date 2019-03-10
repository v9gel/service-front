<template>
  <div id="app">
      <div class="if" v-if="this.$route.name != 'login'">
          <el-row class="tac">
              <div class="container">
                  <div class="nav">
                      <Sidebar></Sidebar>
                  </div>

                  <div class="main">
                      <el-row>
                          <el-col :span="24">
                              <router-view/>
                          </el-col>
                      </el-row>
                  </div>
              </div>
          </el-row>
      </div>
      <div v-else>
          <Login></Login>
      </div>
  </div>
</template>

<script>
    import Sidebar from "@/components/Sidebar";
    import Login from "./views/Login";

    export default {
        name: 'app',
        components: {
            Login,
            Sidebar
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%
}

html,
body, #app, .tac, .if {
    height: 100%;
    padding: 0;
    margin: 0;
}

.container {
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;

    -ms-flex-direction: row;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
}

.nav {
    border-right: solid 1px #e6e6e6;
    width: 220px;
    -ms-flex: 0 100px;
    -webkit-box-flex:  0;
    -moz-box-flex:  0;
    -ms-box-flex:  0;
    box-flex:  0;
}


.main {
    padding: 0 15px;
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
}



</style>
