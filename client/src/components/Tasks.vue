<template>
  <panel title="Tasks">
    <v-layout row wrap>
      <v-flex class="mb-2 mr-2" xs-4 v-for="task in tasks" :key="task.id">
        <v-card v-bind:class="{'green lighten-4': task.isDone}">
          <v-card-text>
            <p v-if="editTaskId !== task.id" class="text-xs-center">{{ task.text }}</p>
            <v-text-field v-else label="Text" v-model="task.text" required></v-text-field>
          </v-card-text>
          <v-card-actions v-if="editTaskId !== task.id" row wrap>
            <v-btn flat @click="toggleEdit(task.id)">Edit</v-btn>
            <v-btn flat @click="deleteTask(task)">Delete</v-btn>
            <v-btn v-if="!task.isDone" flat color="green" @click="changeTaskStateIsDone(task)">Complete</v-btn>
            <v-btn v-if="task.isDone" flat color="red" @click="changeTaskStateIsDone(task)">Uncomplete</v-btn>
          </v-card-actions>
          <v-card-actions v-else row wrap>
            <v-btn flat color="green" @click="saveTask(task)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import TaskService from '@/services/TaskService'
export default {
  data () {
    return {
      tasks: null,
      editTaskId: null
    }
  },
  async mounted () {
    // If user is logged in, fetch tasks created by that user. Otherwise, redirect to login page.
    if (this.$store.state.token) this.loadTasks()
    else this.$router.push({ name: 'Login' })
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
      }
    },
    async loadTasks () {
      let credentials = {token: this.$store.state.token}
      this.tasks = (await TaskService.getTasks(credentials)).data
    },
    async deleteTask (task) {
      function removeFromData (taskId, tasks) {
        let indexOfTask = tasks.map(item => item.id).indexOf(taskId)
        tasks.splice(indexOfTask, 1)
      }

      let credentials = {token: this.$store.state.token}
      await TaskService.deleteTask(task.id, credentials)
      removeFromData(task.id, this.tasks)
    },
    toggleEdit (taskId) {
      if (this.editTaskId === taskId) this.editTaskId = null
      else this.editTaskId = taskId
    },
    saveTask (task) {
      this.editTaskId = null
    }
  }
}
</script>

<style>

</style>
