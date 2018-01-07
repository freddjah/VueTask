<template>
  <panel title="Tasks">
    <v-btn slot="action" flat @click="toggleAddTaskForm()">Add New Task</v-btn>
    <v-layout row wrap>
      <!-- Show form for new task if "add new task" has been clicked -->
      <v-flex v-if="showAddTaskForm" class="mb-2 mr-2" xs-4>
        <v-card class="yellow lighten-4">
          <v-card-text>
            <v-text-field label="Text" v-model="newTaskText" required></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="green" @click="addTask(newTaskText)">Save</v-btn>
            <v-btn flat @click="toggleAddTaskForm()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <!-- Show every task in db -->
      <v-flex class="mb-2 mr-2" xs-4 v-for="task in tasks" :key="task.id">
        <v-card v-bind:class="{'green lighten-4': task.isDone}">
          <v-card-text>
            <!-- If task is not in "edit" mode show as text as p -->
            <p v-if="editTaskId !== task.id" class="text-xs-center">{{ task.text }}</p>

            <!-- Otherwise show text as editable text field -->
            <v-text-field v-else label="Text" v-model="task.text" required></v-text-field>
          </v-card-text>

          <!-- If task is not in "edit" mode show buttons: Edit, Delete, Complete (or Uncomplete) -->
          <v-card-actions v-if="editTaskId !== task.id" row wrap>
            <v-btn flat @click="toggleEdit(task.id)">Edit</v-btn>
            <v-btn flat @click="deleteTask(task)">Delete</v-btn>

            <!-- If task is not completed show Complete button -->
            <v-btn v-if="!task.isDone" flat color="green" @click="changeTaskStateIsDone(task)">Complete</v-btn>
            
            <!-- Otherwise show Uncomplete button -->
            <v-btn v-if="task.isDone" flat color="red" @click="changeTaskStateIsDone(task)">Uncomplete</v-btn>
          </v-card-actions>

          <!-- If task is in "edit" mode show only Save button -->
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
      newTaskText: '',
      editTaskId: null,
      showAddTaskForm: false
    }
  },
  async mounted () {
    // If user is logged in, fetch tasks created by that user. Otherwise, redirect to login page.
    if (this.$store.state.token) this.loadTasks()
    else this.$router.push({ name: 'Login' })
  },
  methods: {
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
    async saveTask (task) {
      this.editTaskId = null

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
    async addTask () {
      let information = {
        text: this.newTaskText,
        token: this.$store.state.token
      }

      try {
        let task = (await TaskService.addTask(information)).data
        this.tasks.push(task)
      } catch (error) {
      }

      this.showAddTaskForm = false
      this.newTaskText = ''
    },
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
    toggleAddTaskForm () {
      if (this.showAddTaskForm === true) this.showAddTaskForm = false
      else this.showAddTaskForm = true
    },
    toggleEdit (taskId) {
      if (this.editTaskId === taskId) this.editTaskId = null
      else this.editTaskId = taskId
    }
  }
}
</script>

<style>

</style>
