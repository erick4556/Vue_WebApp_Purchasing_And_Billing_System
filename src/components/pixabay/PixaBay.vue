<template>
  <b-container fluid class="p-4 bg-dark text-white">
    <b-row>
      <!-- <b-col md="6">
        <b-form-input
          v-model="search"
          placeholder="Ingrese nombre"
          @keypress.enter="searchImages"
        />
      </b-col>
      <b-col md="1">
        <b-button variant="danger" @click="searchImages">Buscar</b-button>
      </b-col> -->
      <b-col>
        <Buscador @buscarDesdeHijo="startSearch" />
        <!-- Cuando el hijo emita una señal desde buscarDesdeHijo, en el padre responde searchImages -->
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="img in pixaImages"
        :key="img.id"
        md="2"
        class="py-2 text-center"
      >
        <!--    <b-img :id="img.id" :src="img.previewURL" thumbnail fluid /> -->
        <Imagen :img="img" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="Imagen"
          @input="searchImages"
          v-if="rows > 0"
        />
        <b-alert variant="danger" show v-else
          >Búsqueda de {{ search }} no se devolvió nada
        </b-alert>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ApiService from "./ApiService";
import Imagen from "./Image";
import Buscador from "./Buscador";
export default {
  name: "PixaBay",
  components: {
    Imagen,
    Buscador,
  },
  data() {
    return {
      pixaImages: [],
      search: "",
      currentPage: 1,
      rows: 1,
      perPage: 20,
    };
  },
  methods: {
    async searchImages() {
      // this.search = search;
      const request = await ApiService.getImages(this.search, this.currentPage);
      this.pixaImages = request.hits;
      // console.log(request);
      this.rows = request.total / this.perPage;
    },
    startSearch(search = "") {
      this.search = search;
      this.searchImages();
      this.currentPage = 1;
    },
  },
  mounted() {
    this.searchImages();
  },
};
</script>

<style>
</style>