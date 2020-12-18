<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <Modal ref="modal" :item="nuevo" />
          <Message />
          <Docs />
          <v-btn
            big
            color="pink"
            dark
            absolute
            bottom
            right
            fab
            @click="showModal"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <v-progress-linear
            :active="loading.state2"
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
          >
          </v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Message from "./Message";
import Docs from "./Docs";
import Modal from "./Modal";
export default {
  name: "Documentos",
  components: {
    Message,
    Docs,
    Modal,
  },
  data: () => {
    return {
      nuevo: {
        id: -1,
        nombre: "Nuevo Documento",
        expira: "",
        alerta1y: true,
        alerta6m: true,
        alerta3m: true,
        alerta1m: true,
      },
      item: [],
    };
  },
  mounted() {
    try {
      // this.$store.commit("showLoading", "Cargando...");
      this.$store.commit("setItems"); //Nombre de la mutación
    } catch (error) {
      console.log(error);
    }
    /* finally {
      this.$store.commit("hideLoading");
    } */
  },
  computed: {
    allItems() {
      return this.$store.state.items;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    showModal() {
      this.$refs.modal.show(); //Va acceder al modal por la referencia
      this.nuevo = {
        id: -1,
        nombre: "Nuevo Documento",
        expira: "",
        alerta1y: true,
        alerta6m: true,
        alerta3m: true,
        alerta1m: true,
      };
    },
  },
};
</script>

<style scoped>
</style>