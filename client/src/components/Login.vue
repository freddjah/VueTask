<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field label="Username" v-model="username" @keyup.enter="login"/>
        <br>
        <v-text-field label="Password" type="password" v-model="password" @keyup.enter="login"/>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn dark class="cyan" @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', {
          username: response.data.username,
          userId: response.data.user_id
        })
        this.$router.push({ name: 'Index' })
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<style scoped>
</style>