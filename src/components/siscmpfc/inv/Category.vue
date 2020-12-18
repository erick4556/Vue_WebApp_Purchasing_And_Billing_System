<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            dense
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-1"
            :loading="loading"
            loading-text="Cargando..."
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Categorías</v-toolbar-title>
                <v-divider class="mx-4" inset vertical />
                <v-text-field
                  v-model="search"
                  append-icon="mdf-magnify"
                  label="Buscar"
                />
                <v-spacer />
                <v-btn color="warning" dark class="mb-2" @click="start">
                  <v-icon>cached</v-icon>
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="start">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ApiInv } from "./ApiInv";
export default {
  name: "Category",
  data: () => {
    return {
      items: [],
      api: new ApiInv(),
      search: "",
      loeading: false,
      headers: [
        {
          text: "ID",
          value: "id",
        },
        {
          text: "Descripción",
          align: "start",
          sortable: true,
          value: "descripcion",
        },
      ],
    };
  },
  methods: {
    async start() {
      try {
        this.loading = true;
        let r = await this.api.getCategorias();
        this.items = r;
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    //Cuando se cree el componente ejecute la función start
    this.start();
  },
};
</script>