import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'pgl',
      age: 12
    }
  },
  mutations: {
    changeName(state) {
      return state.name
    }
  },
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export default store
