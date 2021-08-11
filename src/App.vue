<template>
  <v-app>
    <v-system-bar>
      <v-app-bar-nav-icon @click.stop="showMenu = !showMenu" />
      <v-spacer></v-spacer>
      <v-icon>perm_identity</v-icon>{{ usuario }}
      <div class="mx-1"></div>
      <v-icon @click="logOut">logout</v-icon>
    </v-system-bar>
    <v-navigation-drawer
      v-model="showMenu"
      expand-on-hover
      temporary
      absolute
      :mini-variant="miniVariant"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="./assets/logo.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">Uso de Vue </v-list-item-title>
            <v-list-item-subtitle>test@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <div v-for="m in menu" :key="m.name">
          <router-link :to="m.path">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{ m.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ m.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
/* import Home from "./components/Home";
import Pixabay from "./components/pixabay/PixaBay"; */
export default {
  name: "App",
  components: {
    /* Home,
    Pixabay, */
  },
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "Inicio",
          icon: "home",
        },
        {
          path: "/pixa",
          name: "Imágenes",
          icon: "image_search",
        },
        {
          path: "/docs",
          name: "Documentos",
          icon: "devices_other",
        },
        {
          path: "/siscmpfc",
          name: "SysCmpFc",
          icon: "storefront",
        },
      ],
      showMenu: false,
      miniVariant: true,
      usuario: localStorage.getItem("usuario"),
    };
  },
  mounted() {
    //Uso de session storage
    /* this.$session.set("username", "usertest");
    console.log(this.$session.get("username")); */
    //this.$session.clear(); //Limpiar todas las variables de sesión
    //this.$session.cler("variable"); //Limpiar una variable en específico de la sesión

    //Uso de local storage
    //localStorage.usuario = "usertest";
    //console.log(localStorage.usuario);
    localStorage.setItem("usuario", "usertest2");
    console.log(localStorage.getItem("usuario"));
  },
  methods: {
    logOut() {
      localStorage.removeItem("usuario");
      this.usuario = "";
      this.$router.push("/");
    },
  },
};
</script>

<style>
a:link {
  text-decoration: none;
}
</style>