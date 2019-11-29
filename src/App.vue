<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toggleMode">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Toggle Dark / Light Mode</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        Note Keeper App
      </v-toolbar-title>
    </v-app-bar>

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
            <!-- {{ $store.state.notes }} {{ $store.state.dates }} -->
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
  import Notes from './components/Notes.vue';
  import NoteEntry from './components/NoteEntry.vue';

  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      counter: 0
    }),
    components: {
      Notes,
      NoteEntry
    },
    created() {
      this.$vuetify.theme.dark = true;
    },
    methods: {
      toggleMode() {
        if (this.$vuetify.theme.dark === true) {
          this.$vuetify.theme.dark = false;
        } else {
          this.$vuetify.theme.dark = true;
        }
      }
    }
  };
</script>

<style>
  #inspire {
    background: url('./assets/background_1.jpeg') center center;
  }
</style>
