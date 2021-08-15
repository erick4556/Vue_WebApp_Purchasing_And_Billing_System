import axios from "../../service/httpclient";
export class ApiAuth {
  constructor() {
    this.SERVER_URL = process.env.VUE_APP_SERVER_URL;
    this.TOKEN_URL = this.SERVER_URL + "token/";
    this.credenciales = "";
  }

  async login(username, password) {
    this.credenciales = { username, password };
    /*  let token = null;
    try {
      const r = await fetch(this.TOKEN_URL, {
        method: "POST",
        body: JSON.stringify(this.credenciales),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      token = await r.json(); //Para que procese la respuesta en json
    } catch (error) {
      token = { error: error.toString() };
    }
    return token; */

    const response = await axios.post("token/", this.credenciales);
    return response;
  }

  getToken() {
    const ACCESS = localStorage.getItem("access");
    const REFRESH = localStorage.getItem("refresh");
    /*   //Restricción con js
    if (!ACCESS || !REFRESH) {
      window.location.href = "login";
    } */
    const token = { access: ACCESS, refresh: REFRESH };
    return token;
  }
}
