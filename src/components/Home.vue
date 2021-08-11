<template>
  <b-container>
    <b-row>
      <b-col>
        <h1>
          Curso de Vue y Django <small>- Test </small
          ><!-- Session Storage test:
          {{ testSessionStorage }} -->
        </h1>
        <img
          src="../assets/lights.jpg"
          alt=""
          width="100%"
          height="auto"
          rounded="circle"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="red in redes" :key="red.red" class="text-center">
        <b-link :href="red.url" target="_blank">
          <b-alert :variant="red.color" show>
            {{ red.red }}
          </b-alert>
        </b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      redes: [
        {
          red: "Facebook",
          url: "https://www.facebook.com",
          color: "info",
        },
        {
          red: "Twitter",
          url: "https://www.twitter.com",
          color: "warning",
        },
        {
          red: "Instagram",
          url: "https://www.instagram.com",
          color: "danger",
        },
      ],
      //testSessionStorage: this.$session.get("username"),
    };
  },
};
</script>

<style>
</style>