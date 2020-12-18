<template>
  <div>
    <v-alert
      v-model="message.show"
      dismissible
      close-icon="mdi-delete"
      color="pink"
      dark
      border="top"
      icon="mdi-shield-lock-outline"
      transition="scale-transition"
    >
      {{ message.text }}
    </v-alert>

    <v-snackbar v-model="message.show" shaped color="red"
      >{{ message.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="message.show = false">
          <v-icon>auto_delete</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Message",
  computed: {
    message() {
      //Contiene el valor del store
      return this.$store.state.message;
    },
  },
};
</script>