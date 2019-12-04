import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuex)

const state = {
  notes: [],
  dates: [],
  counter: 0,
  tags: [
    'JavaScript',
    'Vue',
    'Node',
    'React',
    'Python',
    'MongoDB',
    'Feathers',
    'Express'
  ],
  selectedTags: []
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
  },
  ADD_TAG(state, payload) {
    let tag = payload;
    state.tags.unshift(tag);
  },
  ADD_SELECTED_TAG(state, payload) {
    let selectedTag = payload;
    state.selectedTags.push(selectedTag);
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
  },
  addTag(context, payload) {
    context.commit('ADD_TAG', payload);
  },
  addSelectedTag(context, payload) {
    context.commit('ADD_SELECTED_TAG', payload);
  },
}

const getters = {
  getNotes: state => state.notes,
  getDates: state => state.dates,
  getTags: state => state.tags,
  getSelectedTags: state => state.selectedTags,
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
    tags() {
      return this.$store.getters.getTags;
    },
    selectedTags() {
      return this.$store.getters.getTags;
    },
    counter() {
      return this.$store.getters.getCounter;
    },
  },
  render: h => h(App)
}).$mount('#app')