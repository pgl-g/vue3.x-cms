import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      name: 'pgl'
    }
  }
})

export default store
