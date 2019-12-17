<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="left" justify="center">
          <h3>Number of Notes : {{ docs.notes.length }}</h3>
        </v-row>
        <v-container fluid>
          <v-container fluid>
            <notes />
            <br />
            <br />
            <br />
            <br />
            <tiptap />
          </v-container>
        </v-container>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; Armin Varshokar, 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Notes from './Notes.vue';
  import Tiptap from './Tiptap.vue';
  import firebase from 'firebase';
  import { db } from '../main';

  export default {
    data() {
      return {
        docs: null,
        panel: []
      };
    },
    firestore() {
      return {
        docs: db.collection('users').doc(firebase.auth().currentUser.uid)
      };
    },
    components: {
      Notes,
      Tiptap
    }
  };
</script>

<style>
  #inspire {
    background: url('../assets/background_1.jpg') center center;
  }
</style>
