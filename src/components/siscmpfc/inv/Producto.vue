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
                <v-toolbar-title>Productos</v-toolbar-title>
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

                <v-dialog v-model="dialog" max-width="100%" dense persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      ><v-icon>add_box</v-icon></v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2">
                            <v-text-field
                              v-model="editedItem.id"
                              label="ID"
                              disabled=""
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.codigo"
                              label="Código"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.descripcion"
                              label="Descripción"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-autocomplete
                              v-model="editedItem.subcategoria"
                              :items="subcategorias"
                              label="Sub Categorías"
                              item-text="descripcion"
                              item-value="id"
                              return-object
                            ></v-autocomplete>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.existencia"
                              label="Existencia"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.precio"
                              label="Precio"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancelar</v-btn
                      >
                      <v-btn color="pink accent-3" text @click="save"
                        >Guardar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
              <v-icon color="danger" small @click="deleteItem(item)"
                >mdi-delete</v-icon
              >
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
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Código",
          align: "start",
          sortable: true,
          value: "codigo",
        },
        {
          text: "Descripción",
          align: "start",
          sortable: true,
          value: "descripcion",
        },
        { text: "Existencia", value: "existencia", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Sub Categoría", value: "scat_descripcion", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      editIndex: -1,
      editedItem: {
        id: -1,
        codigo: "",
        descripcion: "",
        existencia: 0,
        precio: 0,
        subcategoria: { id: -1, descripcion: "" },
      },
      defaultItem: {
        id: -1,
        codigo: "",
        descripcion: "",
        existencia: 0,
        precio: 0,
        subcategoria: { id: -1, descripcion: "" },
      },
      subcategorias: [],
    };
  },
  computed: {
    formTitle() {
      return (this.editIndex === -1 ? "Nueva" : "Editar") + " Sub Categoría";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    async start() {
      try {
        this.loading = true;
        let r = await this.api.getProductos();
        this.items = r;
        this.subcategorias = await this.api.getSubCategorias();
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        //Para que cuando se cierre la ventana modal, los elementos se actualicen
        this.editedItem = Object.assign({}, this.defaultItem); // Asigno el valor por default
        this.editedIndex = -1;
      });
    },
    async save() {
      const cp = this.editedItem;
      const cat = cp["subcategoria"];
      console.log(cp);
      let idCat = null;
      if (cat["id"]) {
        idCat = cat["id"];
      } else {
        idCat = cat;
      }

      const obj = {
        id: cp["id"],
        codigo: cp["codigo"],
        descripcion: cp["descripcion"],
        existencia: cp["existencia"],
        precio: cp["precio"],
        subcategoria: idCat,
        subcategoria_id: idCat,
      };

      try {
        this.loading = true;
        await this.api.saveProducto(obj);
        this.close();
        this.start();
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },
    editItem(item) {
      this.editIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item); //Le asigno un objeto
      this.dialog = true;
    },
    async deleteItem(item) {
      if (confirm("Borrar Sub Categoria?")) {
        await this.api.deleteProducto(item.id);
        this.start();
      }
    },
  },
  created() {
    //Cuando se cree el componente ejecute la función start
    this.start();
  },
};
</script>