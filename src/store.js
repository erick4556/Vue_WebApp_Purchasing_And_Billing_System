import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import api from "./components/documents/api";

export default new Vuex.Store({
  state: {
    items: [],
    message: {
      show: false,
      text: "",
    },
    loading: {
      title: "Cargando...",
      state2: true,
    },
  },

  getters: {
    getAllItems: (state) => {
      return state.items;
    },
  },

  mutations: {
    //mutations es la unica forma de alterar los estados
    //Estas funciones de mutations solo reciben dos parámetros, el state y el payload (la accion o parámetros que va recibir)
    async setItems(state) {
      try {
        this.commit("showLoading", "Cargando...");
        let items = await api.getAll();
        if (typeof items === "string") {
          this.commit("message", items);
        } else {
          state.items = items;
        }
      } catch (error) {
        this.commit("message", error.message);
      } finally {
        this.commit("hideLoading", "Cargando...");
      }
    },
    async insertDocument(state, payload) {
      try {
        this.commit("showLoading", "Cargando...");
        let r = await api.insertDoc(payload);
        if (typeof r === "string") {
          this.commit("message", r);
        } else {
          state = r;
          this.commit("message", "Registro insertado correctamente");
          let items = await api.getAll();
          this.state.items = items;
        }
      } catch (error) {
        this.commit("message", error.message);
      } finally {
        this.commit("hideLoading", "Cargando...");
      }
    },
    async updateDoc(state, paylodad) {
      let r = await api.updateDoc(paylodad);
      this.commit("message", "Registro actualizado correctamente");
      state = r;
      this.state.items = await api.getAll();
    },
    async deleteDoc(state, payload) {
      console.log(payload);
      state = api.deleteDoc(payload.id);
      this.state.items = await api.getAll();
    },
    showLoading(state, payload) {
      state.loading.state2 = true;
      if (payload) {
        this.state.loading.title = payload;
      }
    },
    hideLoading(state) {
      state.loading.state2 = false;
    },
    message(state, payload) {
      this.state.message.show = true;
      this.state.message.text = payload;
    },
  },
});
