<template>
  <div>
    <navbar></navbar>
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import navbar from './components/Navbar';
  export default {
    methods: {
      created() {
        this.$vuetify.theme.dark = true;
      }
    },
    components: {
      navbar
    }
  };
</script>
