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
      <v-tab-item><Purchases /></v-tab-item>
      <v-tab-item><Billings /></v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Inventory from "./inv/Inventory";
import Purchases from "./cmp/Purchases";
import Billings from "./fac/Billings";
export default {
  name: "Main",
  components: {
    Inventory,
    Purchases,
    Billings,
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