<template>
  <div class="hello">
    <h1>Create, edit and complete tasks!</h1>
    <span v-if="!this.$store.state.token">Start by logging in</span>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
