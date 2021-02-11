<template>
  <v-app>
    <v-system-bar>
      <v-app-bar-nav-icon @click.stop="showMenu = !showMenu" />
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
    };
  },
};
</script>

<style>
a:link {
  text-decoration: none;
}
</style>