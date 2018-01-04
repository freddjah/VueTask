<template>
  <v-layout>
    <v-flex>
      <div v-for="task in tasks" :key="task.id">
        {{ task }}
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import TaskService from '@/services/TaskService'
export default {
  data () {
    return {
      tasks: null
    }
  },
  async mounted () {
    let token = this.$store.state.token
    this.tasks = (await TaskService.getTasks(token)).data
  }
}
</script>

<style>

</style>
