<template>
  <v-container fluid class="noteContainer">
    <dropdown></dropdown>
    <br />
    <!-- <p>{{ $store.state.notes }}</p>
    <p>{{ $store.state.dates }}</p> -->
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
      <v-date-picker v-model="date"></v-date-picker>
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

  export default {
    data: function() {
      return {
        clearable: true,
        filled: true,
        outlined: true,
        note: '',
        overlay: false,
        date: new Date().toISOString().substr(0, 10)
      };
    },
    methods: {
      createNewNote() {
        if (this.note === '') {
          this.overlay = true;
          return;
        }
        this.$store.dispatch('addNote', this.note);
        this.$store.dispatch('addDate', this.date);
        this.note = '';
        this.date = new Date().toISOString().substr(0, 10);
      }
    },
    name: 'NoteEntry',
    components: {
      Dropdown
    }
  };
</script>

<style scoped>
  .noteContainer {
    max-width: 100%;
  }
</style>
