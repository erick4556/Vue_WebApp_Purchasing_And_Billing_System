<template>
  <div>
    <b-row align-h="center">
      <b-col md="6">
        <b-form-input
          v-model="search"
          placeholder="Ingrese nombre"
          @keypress.enter="buscarHijo"
        />
      </b-col>
      <b-col md="1">
        <b-button variant="danger" @click="buscarHijo">Buscar</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Buscador",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    buscarHijo() {
      this.$emit("buscarDesdeHijo", this.search); //$emit emite una señal
    },
  },
};
</script>

<style>
</style>