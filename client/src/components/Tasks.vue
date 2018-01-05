<template>
  <v-layout row wrap>
    <v-flex class="mb-2 mr-2" xs-4 v-for="task in tasks" :key="task.id">
      <v-card v-bind:class="{'green lighten-4': task.isDone}">
        <v-card-text>
          <p class="text-xs-center">{{ task.text }}</p>
        </v-card-text>
        <v-card-actions row wrap>
          <v-btn flat>Edit</v-btn>
          <v-btn flat>Delete</v-btn>
          <v-btn v-if="!task.isDone" flat color="green" @click="changeTaskStateIsDone(task)">Complete</v-btn>
          <v-btn v-if="task.isDone" flat color="red" @click="changeTaskStateIsDone(task)">Uncomplete</v-btn>
        </v-card-actions>
      </v-card>
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
    // If user is logged in, fetch tasks created by that user. Otherwise, redirect to login page.
    if (this.$store.state.token) {
      let credentials = {token: this.$store.state.token}
      this.tasks = (await TaskService.getTasks(credentials)).data
    } else this.$router.push({ name: 'Login' })
  },
  methods: {
    async changeTaskStateIsDone (task) {
      task.isDone = !task.isDone

      let information = {
        text: task.text,
        isDone: task.isDone,
        token: this.$store.state.token
      }

      try {
        let updatedTask = (await TaskService.editTask(task.id, information)).data
        task = updatedTask
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>