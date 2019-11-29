<template>
  <!-- TODO: add a button to expand/collapse all notes: -->
  <v-expansion-panels focusable multiple :popout="popout">
    <v-expansion-panel
      class="noteContainer"
      v-for="(note, index) in $store.state.notes"
      :key="index"
    >
      <div>
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
            ' )'
        }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        {{ note }}
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
