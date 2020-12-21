import Api from "../Api";

export class ApiInv extends Api {
  constructor() {
    super();
  }

  getCategorias = async (id = -1) => {
    return await super.get("categoria", id);
  };

  async saveCategoria(obj) {
    return await super.save("categoria", obj);
  }

  async deleteCategoria(id) {
    return await super.delete("categoria", id);
  }

  async getSubCategorias(id = -1) {
    return await super.get("subcategoria", id);
  }

  async saveSubCategoria(obj) {
    return await super.save("subcategoria", obj);
  }

  async deleteSubCategoria(id) {
    return await super.delete("subcategoria", id);
  }

  async getProductos(id = -1) {
    return await super.get("producto", id);
  }

  async saveProducto(obj) {
    return await super.save("producto", obj);
  }

  async deleteProducto(id) {
    return await super.delete("producto", id);
  }
}
