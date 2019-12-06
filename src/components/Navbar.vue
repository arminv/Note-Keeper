<template>
  <div>
    <!-- TODO: Add the user's name at the top and delete when signed out: -->
    <!-- TODO: Find + add better icons: -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click="showDashboard">
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
        <v-list-item link @click="showRegister">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="signOut">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="$store.state.user.data">
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-title>Sign In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="$store.state.user.data">
        Note Keeper App - Hi, {{ $store.state.user.data.displayName }} :)
      </v-toolbar-title>
      <v-toolbar-title v-else>
        Note Keeper App
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    data: () => ({
      drawer: null
    }),
    methods: {
      toggleMode() {
        this.$vuetify.theme.dark === true
          ? (this.$vuetify.theme.dark = false)
          : (this.$vuetify.theme.dark = true);
      },
      created() {
        this.$vuetify.theme.dark = true;
      },
      showDashboard() {
        this.$router.replace({
          name: 'Dashboard'
        });
      },
      showRegister() {
        this.$router.replace({
          name: 'Register'
        });
      },
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              name: 'Login'
            });
          })
          .catch(err => {
            this.error = err.message;
          });
        // this.$store.dispatch('fetchUser', null);
      }
    }
  };
</script>

<style></style>
