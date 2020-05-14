<template>
  <v-form v-model="valid" @submit.prevent="submit" class="form">
    <!-- <br />
    <br />
    <br />
    <br />
    <br />
    <br /> -->
    <v-container>
      <div v-if="error">
        <label>
          {{ error }}
        </label>
      </div>

      <v-row>
        <br />
        <br />
        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit">Login</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      error: null,
      show1: false,
      form: {
        password: '',
        email: '',
      },
      rules: {
        required: (value) => !!value || 'Required.',
        // emailMatch: () => "The email and password you entered don't match"
      },
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: 'Dashboard' });
        })
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>

<style>
.form {
  margin-top: 70px;
  margin-left: 50px;
}
</style>
