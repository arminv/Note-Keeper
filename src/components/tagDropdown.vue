<template>
  <v-container fluid class="noteContainer">
    <div class="text-center d-flex pb-4">
      <v-form ref="form">
        <v-text-field
          v-model="newTag"
          @keydown.enter.prevent="createNewTag(newTag)"
          label="Add A New Tag : "
          placeholder="Press enter to add"
          :outlined="outlined"
          :rounded="rounded"
          clearable
          counter
        >
        </v-text-field>
      </v-form>
      <br />
      <v-select
        v-model="selectedTag"
        v-on:change="emitSelection(selectedTag)"
        :items="docs.tags"
        label="Select Tags :"
        :outlined="outlined"
        :rounded="rounded"
        multiple
      >
        <template v-slot:prepend-item>
          <v-list-item ripple @click="toggle">
            <v-list-item-action>
              <v-icon :color="selectedTag.length > 0 ? 'indigo darken-4' : ''">
                {{ icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Select All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
        <template v-slot:append-item>
          <v-divider class="mb-2"></v-divider>
          <v-list-item disabled>
            <v-list-item-avatar color="grey lighten-3">
              <v-icon>mdi-food-apple</v-icon>
            </v-list-item-avatar>

            <v-list-item-content v-if="likesAllLang">
              <v-list-item-title
                >Holy smokes, someone call the programming police!
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-content v-else-if="likesSomeLang">
              <v-list-item-title>Lang Count</v-list-item-title>
              <v-list-item-subtitle>
                {{ selectedTag.length }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content v-else>
              <v-list-item-title>
                How could you not like programming?! :O
              </v-list-item-title>
              <v-list-item-subtitle>
                Go ahead, make a selection above and learn! :)
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>

      <v-overlay :value="overlay" opacity="0.90" dark>
        <v-btn icon @click="overlay = false">
          <h2>
            Tag is empty! Add something
            <v-icon>
              fas fa-window-close
            </v-icon>
          </h2>
        </v-btn>
      </v-overlay>
    </div>
  </v-container>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '../main';

  export default {
    data: () => ({
      docs: null,
      newTag: '',
      selectedTag: [],
      outlined: true,
      rounded: true,
      overlay: false
    }),
    firestore() {
      return {
        docs: db.collection('users').doc(firebase.auth().currentUser.uid)
      };
    },
    computed: {
      likesAllLang() {
        return this.selectedTag.length === this.docs.tags.length;
      },
      likesSomeLang() {
        return this.selectedTag.length > 0 && !this.likesAllLang;
      },
      icon() {
        if (this.likesAllLang) return 'mdi-close-box';
        if (this.likesSomeLang) return 'mdi-minus-box';
        return 'mdi-checkbox-blank-outline';
      }
    },
    methods: {
      toggle() {
        this.$nextTick(() => {
          if (this.likesAllLang) {
            this.selectedTag = [];
          } else {
            this.selectedTag = this.docs.tags.slice();
          }
          this.emitSelection(this.selectedTag);
        });
      },
      createNewTag() {
        if (this.newTag === '') {
          this.overlay = true;
          return;
        }
        let ref = db.collection('users').doc(firebase.auth().currentUser.uid);
        return db.runTransaction(transaction => {
          return transaction.get(ref).then(doc => {
            const tags = doc.data().tags;
            tags.unshift(this.newTag);
            // Update the firestore data after change:
            transaction.update(ref, { tags: tags });
            this.newTag = '';
          });
        });
      },
      emitSelection(selectedTag) {
        this.$emit('selectionListen', selectedTag);
      }
    }
  };
</script>

<style scoped>
  .noteContainer {
    max-width: 50%;
  }
</style>
