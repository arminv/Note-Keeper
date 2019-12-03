<template>
  <v-container fluid>
    <!-- TODO: add a new tag to the list: -->
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
      <!-- <v-btn class="mr-4" @click="submit">submit</v-btn> -->
    </v-form>

    <!-- <p>{{ $store.state.tags }}</p> -->

    <br />
    <!-- TODO: add selected tags to the current note being edited: -->
    <v-select
      v-model="selectedLang"
      :items="$store.state.tags"
      label="Select Tags"
      :outlined="outlined"
      :rounded="rounded"
      multiple
    >
      <template v-slot:prepend-item>
        <v-list-item ripple @click="toggle">
          <v-list-item-action>
            <v-icon :color="selectedLang.length > 0 ? 'indigo darken-4' : ''">{{
              icon
            }}</v-icon>
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
              >Holy smokes, someone call the programming
              police!</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-content v-else-if="likesSomeLang">
            <v-list-item-title>Lang Count</v-list-item-title>
            <v-list-item-subtitle>{{
              selectedLang.length
            }}</v-list-item-subtitle>
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
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      selectedLang: [],
      outlined: true,
      rounded: true,
      newTag: '',
      overlay: false
    }),

    computed: {
      likesAllLang() {
        return this.selectedLang.length === this.$store.state.tags.length;
      },
      likesSomeLang() {
        return this.selectedLang.length > 0 && !this.likesAllLang;
      },
      icon() {
        if (this.likesAllLang) return 'mdi-close-box';
        if (this.likesSomeLang) return 'mdi-minus-box';
        return 'mdi-checkbox-blank-outline';
      }
    },

    methods: {
      createNewTag() {
        if (this.newTag === '') {
          this.overlay = true;
          return;
        }
        this.$store.dispatch('addTag', this.newTag);
        this.newTag = '';
      },
      toggle() {
        this.$nextTick(() => {
          if (this.likesAllLang) {
            this.selectedLang = [];
          } else {
            this.selectedLang = this.$store.state.tags.slice();
          }
        });
      }
    }
  };
</script>

<style></style>
