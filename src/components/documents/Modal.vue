<template>
  <div>
    <v-dialog
      v-model="showModal"
      persistent
      transition="dialog-bottom-transition"
      scrollable
      max-width="600px"
    >
      <v-card tile>
        <v-card-title>
          <v-container>
            <v-row>
              <v-col> Documento </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  ref="nombre"
                  v-model="item.nombre"
                  :rules="[() => !!item.nombre || 'Requerido']"
                  required
                  lable="Nombre Documento"
                />
              </v-col>
              <v-col cols="6">
                <v-menu
                  ref="selectDate"
                  v-model="selectDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    max="2099-12-31"
                    :min="date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="selectDate = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.selectDate.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-switch
                  v-model="item.alerta1y"
                  label="Alertar > 1 Año "
                ></v-switch>
              </v-col>
              <v-col>
                <v-switch
                  v-model="item.alerta6m"
                  label="Alertar > 6 meses "
                ></v-switch>
              </v-col>
              <v-col>
                <v-switch
                  v-model="item.alerta3m"
                  label="Alertar > 3 meses "
                ></v-switch>
              </v-col>
              <v-col>
                <v-switch
                  v-model="item.alerta1m"
                  label="Alertar > 1 mes "
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="hide">
            <v-icon>backspace</v-icon>
          </v-btn>
          <v-btn icon @click="save">
            <v-icon>{{ type }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["item"],
  data: () => {
    return {
      selectDate: false,
      showModal: false,
      date: new Date().toISOString().substring(0, 10),
    };
  },
  computed: {
    type() {
      return this.item.id > 0 ? "edit" : "add";
    },
  },
  methods: {
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
    insert(doc) {
      try {
        this.$store.commit("showLoading", "Insertando");
        this.$store.commit("insertDocument", doc);
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.commit("hideLoading");
      }
    },
    update(doc) {
      try {
        this.$store.commit("showLoading", "Actualizando");
        this.$store.commit("updateDoc", doc);
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.commit("hideLoading");
      }
    },
    save() {
      const doc = {
        id: this.item.id,
        nombre: this.item.nombre,
        expira: this.date,
        alerta1y: this.item.alerta1y,
        alerta6m: this.item.alerta6m,
        alerta3m: this.item.alerta3m,
        alerta1m: this.item.alerta1m,
      };
      if (this.item.nombre.length <= 3) {
        this.$store.commit("message", "Nombre es requerido.");
        return;
      }
      if (this.item.id === -1) {
        this.insert(doc);
      } else {
        this.update(doc);
      }
      this.hide();
    },
  },
};
</script>