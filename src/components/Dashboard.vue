<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <h1>Number of Notes : {{ $store.state.counter }}</h1>
        <v-row align="center" justify="center">
          <v-col class="shrink"> </v-col>
        </v-row>
        <v-container fluid>
          <v-container fluid>
            <notes />
            <br />
            <br />
            <note-entry />
            <br />
            <br />
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
  import NoteEntry from './NoteEntry.vue';

  export default {
    props: {
      source: String
    },
    components: {
      Notes,
      NoteEntry
    }
  };
</script>

<style>
  #inspire {
    background: url('../assets/background_1.jpg') center center;
  }
</style>
