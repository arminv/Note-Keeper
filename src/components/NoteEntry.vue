<template>
  <v-container fluid class="noteContainer">
    <dropdown v-on:selectionListen="addSelectedTags"></dropdown>
    <br />
    <!-- TODO: add a rich text editor (e.g. https://github.com/scrumpy/tiptap): -->
    <!-- TODO: add a textfield for note subject: -->
    <v-textarea
      :clearable="clearable"
      :filled="filled"
      :outlined="outlined"
      name="input-7-1"
      label="New Note:"
      auto-grow
      value="Take notes and document all you learn! :)"
      v-model="note"
      counter="true"
    ></v-textarea>
    <div class="text-center">
      <v-btn rounded color="primary" dark @click="createNewNote">
        Save Note
      </v-btn>
    </div>
    <br />
    <v-row justify="center">
      <v-date-picker v-model="date">Pick A Date For The Note</v-date-picker>
    </v-row>

    <v-overlay :value="overlay" opacity="0.90" dark>
      <v-btn icon @click="overlay = false">
        <h2>
          Note is empty! Add something
          <v-icon>
            fas fa-window-close
          </v-icon>
        </h2>
      </v-btn>
    </v-overlay>
  </v-container>
</template>

<script>
  import Dropdown from './tagDropdown.vue';
  import firebase from 'firebase';
  import { db } from '../main';

  export default {
    name: 'NoteEntry',
    data: () => {
      return {
        docs: null,
        note: '',
        date: new Date().toISOString().substr(0, 10),
        selectedTags: [],
        clearable: true,
        filled: true,
        outlined: true,
        overlay: false
      };
    },
    firestore() {
      return {
        docs: db.collection('users').doc(firebase.auth().currentUser.uid)
      };
    },
    components: {
      Dropdown
    },
    methods: {
      createNewNote() {
        if (this.note === '') {
          this.overlay = true;
          return;
        }
        let ref = db.collection('users').doc(firebase.auth().currentUser.uid);
        return db.runTransaction(transaction => {
          return transaction.get(ref).then(doc => {
            const notes = doc.data().notes;
            const dates = doc.data().dates;
            const selectedTags = doc.data().selectedTags;
            notes.push(this.note);
            dates.push(this.date);
            let myIndex = Object.keys(this.docs.selectedTags).length;
            selectedTags[myIndex.toString()] = this.selectedTags;
            // Update the firestore data after change:
            transaction.update(ref, { notes: notes });
            transaction.update(ref, { dates: dates });
            transaction.update(ref, { selectedTags: selectedTags });
            this.note = '';
            this.selectedTags = [];
          });
        });
      },
      addSelectedTags(selection) {
        this.selectedTags = selection;
        return;
      }
    }
  };
</script>

<style>
  .noteContainer {
    max-width: 90%;
  }
</style>
