<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
        <v-btn flat large :to="{ name: 'Index'}">VueTasks</v-btn>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn v-if="$store.state.isUserLoggedIn" flat dark :to="{ name: 'Tasks'}">
        Browse Tasks
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark :to="{ name: 'Login' }">
        Login
      </v-btn>
      
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark>
        Sign Up
      </v-btn>
      
      <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
</style>