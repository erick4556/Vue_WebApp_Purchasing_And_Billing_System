<template>
  <v-card class="color-fondo">
    <v-card-title>
      <h1 class="font-weight-bold display-6 color-texto">
        Sistema de Compra y Facturación
      </h1>
    </v-card-title>
    <v-tabs>
      <v-tab>Inventario</v-tab>
      <v-tab>Compra</v-tab>
      <v-tab>Facturación</v-tab>

      <v-tab-item><Inventory /></v-tab-item>
      <v-tab-item>Detalle del módulo de Compras</v-tab-item>
      <v-tab-item>Detalle del Módulo de Facturación</v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Inventory from "./inv/Inventory";
export default {
  name: "Main",
  components: {
    Inventory,
  },
};
</script>

<style>
.color-fondo {
  background-color: #fffbe6 !important;
}
.color-texto {
  color: #356859 !important;
}
</style> 