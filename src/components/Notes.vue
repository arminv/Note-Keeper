<template>
  <!-- TODO: add a button to expand/collapse all notes: -->
  <v-expansion-panels focusable multiple :popout="popout">
    <v-expansion-panel
      class="noteContainer"
      v-for="(note, index) in $store.state.notes"
      :key="index"
    >
      <div>
        <!-- TODO: Add an edit button & functionality for each note: -->
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
      <v-expansion-panel-header>
        {{
          'Note ' +
            (index + 1) +
            ' (Created on : ' +
            $store.state.dates[index] +
            ' ) - SUBJECT TAGS : ' +
            $store.state.selectedTags[index]
        }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <!-- preserve multi-line notes (i.e. line spacing): -->
        <div style="white-space: pre">{{ note }}</div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  export default {
    data() {
      return {
        popout: true
      };
    },
    methods: {
      deleteNote(index) {
        this.$store.dispatch('deleteNote', index);
      }
    }
  };
</script>

<style scoped>
  .noteContainer {
    max-width: 75%;
  }
</style>
