import Api from "../Api";

const nombreEnc = "compras";
const nombreDet = "compras-detalle";

export class ApiCmp extends Api {
  constructor() {
    super();
  }

  async getProveedores(id = -1) {
    return await super.get("proveedor", id);
  }

  async saveProveedor(obj) {
    return await super.save("proveedor", obj);
  }

  async deleteProveedor(id) {
    return await super.delete("proveedor", id);
  }

  async get(id) {
    return await super.get(nombreEnc, id);
  }

  async saveEnc(obj) {
    return await super.save(nombreEnc, obj);
  }

  async saveDetail(obj) {
    return await super.save(nombreDet, obj);
  }

  async deleteDetail(id) {
    return await super.delete(nombreDet, id);
  }
}
