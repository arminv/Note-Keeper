import Vue from 'vue'
import Vuex from 'vuex'
import router from "./routes/index";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  firestorePlugin
} from 'vuefire'

Vue.config.productionTip = false;
Vue.use(Vuex)
Vue.use(firestorePlugin)

// Firebase configuration
const firebaseConfig = {
  // NOTE: Add your own configs here:
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Export db
export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});
// TODO: Add realtime bindings between Firebase db and Vuex store via Vuefire (https://vuefire.vuejs.org/vuexfire/getting-started.html):

const state = {
  //   notes: [],
  //   dates: [],
  //   counter: 0,
  //   tags: [
  //     'JavaScript',
  //     'Vue',
  //     'Node',
  //     'React',
  //     'Python',
  //     'MongoDB',
  //     'Feathers',
  //     'Express'
  //   ],
  //   selectedTags: [],
  user: {
    loggedIn: false,
    data: null
  }
}

const mutations = {
  //   ADD_NOTE(state, payload) {
  //     let newNote = payload;
  //     state.notes.push(newNote);
  //     state.counter++;
  //   },
  //   DELETE_NOTE(state, payload) {
  //     let index = payload;
  //     state.notes.splice(index, 1);
  //     state.dates.splice(index, 1);
  //     state.counter--;
  //   },
  //   ADD_DATE(state, payload) {
  //     let newTimeStamp = payload;
  //     state.dates.push(newTimeStamp);
  //   },
  //   ADD_TAG(state, payload) {
  //     let tag = payload;
  //     state.tags.unshift(tag);
  //   },
  //   ADD_SELECTED_TAG(state, payload) {
  //     let selectedTag = payload;
  //     state.selectedTags.push(selectedTag);
  //   },
  SET_LOGGED_IN(state, value) {
    state.user.loggedIn = value;
  },
  SET_USER(state, data) {
    state.user.data = data;
  }
}

const actions = {
  //   addNote(context, payload) {
  //     context.commit('ADD_NOTE', payload);
  //   },
  //   deleteNote(context, payload) {
  //     context.commit('DELETE_NOTE', payload);
  //   },
  //   addDate(context, payload) {
  //     context.commit('ADD_DATE', payload);
  //   },
  //   addTag(context, payload) {
  //     context.commit('ADD_TAG', payload);
  //   },
  //   addSelectedTag(context, payload) {
  //     context.commit('ADD_SELECTED_TAG', payload);
  //   },
  fetchUser({
    commit
  }, user) {
    commit("SET_LOGGED_IN", user !== null);

    if (user) {
      commit("SET_USER", {
        displayName: user.displayName,
        email: user.email
      });
    } else {
      commit("SET_USER", null);
    }
  }
}

const getters = {
  user: state => state.user,
  //   getNotes: state => state.notes,
  //   getDates: state => state.dates,
  //   getTags: state => state.tags,
  //   getSelectedTags: state => state.selectedTags,
  //   getNoteCount: state => state.notes.length,
  //   getCounter: state => state.counter,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

new Vue({
  vuetify,
  router,
  store,
  // computed: {
  //   notes() {
  //     return this.$store.getters.getNotes;
  //   },
  //   dates() {
  //     return this.$store.getters.getDates;
  //   },
  //   tags() {
  //     return this.$store.getters.getTags;
  //   },
  //   selectedTags() {
  //     return this.$store.getters.getTags;
  //   },
  //   counter() {
  //     return this.$store.getters.getCounter;
  //   },
  // },
  render: h => h(App)
}).$mount('#app')