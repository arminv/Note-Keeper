import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuex)

const state = {
  notes: [],
  dates: [],
  counter: 0
}

const mutations = {
  ADD_NOTE(state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
    state.counter++;
  },
  DELETE_NOTE(state, payload) {
    let index = payload;
    state.notes.splice(index, 1);
    state.dates.splice(index, 1);
    state.counter--;
  },
  ADD_DATE(state, payload) {
    let newTimeStamp = payload;
    state.dates.push(newTimeStamp);
  }
}

const actions = {
  addNote(context, payload) {
    context.commit('ADD_NOTE', payload);
  },
  deleteNote(context, payload) {
    context.commit('DELETE_NOTE', payload);
  },
  addDate(context, payload) {
    context.commit('ADD_DATE', payload);
  }
}

const getters = {
  getNotes: state => state.notes,
  getDates: state => state.dates,
  getNoteCount: state => state.notes.length,
  getCounter: state => state.counter,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

new Vue({
  vuetify,
  store,
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    dates() {
      return this.$store.getters.getDates;
    },
    counter() {
      return this.$store.getters.getCounter;
    },
  },
  render: h => h(App)
}).$mount('#app')