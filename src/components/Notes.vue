<template>
  <v-container fluid class="noteContainer">
    <div>
      <v-row align="left" justify="center">
        <div class="text-center d-flex pb-4">
          <v-btn @click="all" color="success">Expand</v-btn>
          <v-btn @click="none" color="error">Collapse</v-btn>
        </div>
      </v-row>
      <br />
      <br />
      <v-expansion-panels v-model="panel" focusable multiple :popout="popout">
        <v-expansion-panel
          class="noteContainer"
          v-for="(note, index) in docs.notes"
          :key="index"
        >
          <div>
            <!-- TODO: Add an edit button + functionality for each note: -->
            <v-btn
              class="float-right mx-2"
              fab
              dark
              small
              color="primary"
              @click="deleteNote(index)"
            >
              <v-icon dark>fas fa-trash</v-icon>
            </v-btn>
          </div>

          <v-chip
            v-for="(tag, index_2) in docs.selectedTags[index]"
            :key="index_2"
            class="ma-2"
            outlined
            color="primary"
          >
            {{ tag }}
          </v-chip>

          <v-expansion-panel-header>
            {{
              'Note ' +
                (index + 1) +
                ' - Created by ' +
                $store.state.user.data.displayName +
                ' on : ' +
                docs.dates[index]
            }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <!-- Preserve multi-line notes (i.e. line spacing): -->
            <!-- <div style="white-space: pre">{{ note }}</div> -->
            <div v-html="note"></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '../main';

  export default {
    data() {
      return {
        popout: true,
        docs: null,
        panel: []
      };
    },
    firestore() {
      return {
        docs: db.collection('users').doc(firebase.auth().currentUser.uid)
      };
    },
    methods: {
      deleteNote(index) {
        let ref = db.collection('users').doc(firebase.auth().currentUser.uid);
        return db.runTransaction(transaction => {
          return transaction.get(ref).then(doc => {
            const notes = doc.data().notes;
            const dates = doc.data().dates;
            const selectedTags = doc.data().selectedTags;
            // Start deleting items:
            notes.splice(index, 1);
            dates.splice(index, 1);
            // For tags, we need to reset the object keys for all indexes to match:
            delete selectedTags[index.toString()];
            let selLength = Object.keys(selectedTags).length;
            let selValues = Object.keys(selectedTags).map(i => selectedTags[i]);
            let newSelectedTags = {};
            for (var i = 0; i < selLength; i++) {
              newSelectedTags[i] = selValues[i];
            }
            // Update the firestore data after change:
            transaction.update(ref, { notes: notes });
            transaction.update(ref, { dates: dates });
            transaction.update(ref, { selectedTags: newSelectedTags });
          });
        });
      },
      // Expand all notes:
      all() {
        this.panel = [...Array(this.docs.notes.length).keys()].map((k, i) => i);
      },
      // Collapse all notes:
      none() {
        this.panel = [];
      }
    }
    // created() {
    //   db.collection('users')
    //     .doc(firebase.auth().currentUser.uid)
    //     .onSnapshot(snapshot => {
    //       this.docs = snapshot.data();
    //     });
    // }
  };
</script>

<style scoped>
  .noteContainer {
    max-width: 90%;
  }
</style>
