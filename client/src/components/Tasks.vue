<template>
  <v-layout>
    <v-layout row wrap>
      <v-flex class="mb-2 mr-2" xs-4 v-for="task in tasks" :key="task.id">
        <v-card v-bind:class="{'green lighten-4': task.isDone}">
          <v-card-text>
            <p class="text-xs-center">{{ task.text }}</p>
          </v-card-text>
          <v-card-actions row wrap>
            <v-btn flat color="orange">Edit</v-btn>
            <v-btn flat color="orange">Delete</v-btn>
            <v-btn v-if="!task.isDone" flat color="green">Complete</v-btn>
            <v-btn v-if="task.isDone" flat color="red">Uncomplete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
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
    let credentials = {token: this.$store.state.token}
    this.tasks = (await TaskService.getTasks(credentials)).data
  }
}
</script>

<style>

</style>
