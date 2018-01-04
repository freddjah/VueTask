import Api from '@/services/Api'

export default {
  getTasks (credentials) {
    return Api().post('tasks', credentials)
  }
}
