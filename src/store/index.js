import Vue from 'vue'
import Vuex from 'vuex'
import costumer from './modules/costumer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    costumer
  }
})
