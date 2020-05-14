<template>
  <div>
    <Navbar />
    <main class="py-4">
      <router-view>
        <Dashboard />
      </router-view>
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
export default {
  methods: {
    created() {
      this.$vuetify.theme.dark = true;
    },
  },
  components: {
    Navbar,
    Dashboard
  },
};
</script>
