<template>
  <div>
    <v-container fluid class="noteContainer">
      <dropdown v-on:selectionListen="addSelectedTags"></dropdown>
      <br />
      <div class="editor">
        <v-card>
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
                ><v-icon dark>fas fa-bold</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
                ><v-icon dark>fas fa-italic</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
                ><v-icon dark>fas fa-strikethrough</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                ><v-icon dark>fas fa-underline</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
                ><v-icon dark>fas fa-code</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
                ><v-icon dark>fas fa-paragraph</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
                >H1</v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
                >H2</v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
                >H3</v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                ><v-icon dark>fas fa-list-ul</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
                ><v-icon dark>fas fa-list-ol</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
                ><v-icon dark>fas fa-quote-right</v-icon></v-btn
              >
              <v-btn
              small
                outlined
                color="primary"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
                ><v-icon dark>fas fa-code</v-icon></v-btn
              >
              <v-btn small outlined color="primary" @click="commands.horizontal_rule"
                ><v-icon dark>fas fa-minus</v-icon></v-btn
              >
              <v-btn small outlined color="primary" @click="commands.undo">
                <v-icon dark>fas fa-undo</v-icon>
              </v-btn>
              <v-btn small outlined color="primary" @click="commands.redo"
                ><v-icon dark>fas fa-redo</v-icon></v-btn
              >
              <hr />
            </div>
          </editor-menu-bar>

          <editor-content :editor="editor" />
        </v-card>
      </div>

      <v-btn rounded color="error" dark @click="clearContent">
        Clear Content
      </v-btn>
      <!-- <v-btn color="primary" @click="setContent">
        Set Content
      </v-btn> -->
      <v-btn rounded color="primary" dark @click="createNewNote">
        Add Note
      </v-btn>

      <!-- <div>
        <div v-html="html"></div>
      </div> -->
      <br />
      <br />
      <br />
      <v-row justify="center">
        <v-date-picker v-model="date">Pick A Date For The Note</v-date-picker>
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
  </div>
</template>

<script>
  import firebase from 'firebase';
  import { db } from '../main';
  import Dropdown from './tagDropdown.vue';
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History
  } from 'tiptap-extensions';
  export default {
    components: {
      EditorContent,
      EditorMenuBar,
      Dropdown
    },
    firestore() {
      return {
        docs: db.collection('users').doc(firebase.auth().currentUser.uid)
      };
    },
    data() {
      return {
        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History()
          ],
          content: `
        `,
          onUpdate: ({ getHTML }) => {
            this.html = getHTML();
          }
        }),
        html: '',
        date: new Date().toISOString().substr(0, 10),
        selectedTags: [],
        overlay: false
      };
    },
    methods: {
      clearContent() {
        this.editor.clearContent(true);
        this.editor.focus();
      },
      //   setContent() {
      //     // you can pass a json document
      //     this.editor.setContent(
      //       {
      //         type: 'doc',
      //         content: [
      //           {
      //             type: 'paragraph',
      //             content: [
      //               {
      //                 type: 'text',
      //                 text: 'This is some inserted text. 👋'
      //               }
      //             ]
      //           }
      //         ]
      //       },
      //       true
      //     );
      //     // HTML string is also supported
      //     // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      //     this.editor.focus();
      //   },
      createNewNote() {
        /* eslint-disable */
        console.log(this.html);
        if (this.html === '' || this.html === '<p></p>') {
          this.overlay = true;
          return;
        }
        let ref = db.collection('users').doc(firebase.auth().currentUser.uid);
        return db.runTransaction(transaction => {
          return transaction.get(ref).then(doc => {
            const notes = doc.data().notes;
            const dates = doc.data().dates;
            const selectedTags = doc.data().selectedTags;
            notes.push(this.html);
            dates.push(this.date);
            let myIndex = Object.keys(this.docs.selectedTags).length;
            selectedTags[myIndex.toString()] = this.selectedTags;
            // Update the firestore data after change:
            transaction.update(ref, { notes: notes });
            transaction.update(ref, { dates: dates });
            transaction.update(ref, { selectedTags: selectedTags });
            this.html = '';
            this.editor.clearContent(true);
            this.selectedTags = [];
            return;
          });
        });
      },
      addSelectedTags(selection) {
        this.selectedTags = selection;
        return;
      },
      beforeDestroy() {
        this.editor.destroy();
      }
    }
  };
</script>

<style></style>
