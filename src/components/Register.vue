<template>
  <v-layout align-center>
    <v-flex fill-height>
      <v-form v-model="valid" @submit.prevent="submit">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
              <!-- :counter="10" -->
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                label="Full Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <!-- <v-text-field :type="'password'"> </v-text-field> -->
              <v-text-field
                v-model="form.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit">Submit</v-btn>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '../main';

  export default {
    data() {
      return {
        error: null,
        show1: false,
        form: {
          password: '',
          name: '',
          email: '',
          notes: ['Hello There! Welcome to the note keeper app :)'],
          dates: ['2019-12-15'],
          tags: ['Vue', 'JavaScript', 'Python', 'React.Js', 'Node.Js'],
          selectedTags: { 0: ['Vue', 'Python'] }
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
          // emailMatch: () => "The email and password you entered don't match"
        },
        valid: false,
        nameRules: [
          v => !!v || 'Name is required'
          // v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      };
    },
    methods: {
      submit() {
        let ref = db.collection('users');
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.form.name
              })
              .then(() => {
                // Create a doc with each user's unique ID to keep user's notes, etc. :
                ref.doc(firebase.auth().currentUser.uid).set(this.form);
                this.$router.push({ name: 'Dashboard' });
              });
          })
          .catch(err => {
            this.error = err.message;
          });
      }
    }
  };
</script>

<style></style>
