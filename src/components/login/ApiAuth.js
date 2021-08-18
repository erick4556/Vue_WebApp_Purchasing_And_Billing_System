import axios from "../../service/httpclient";
export class ApiAuth {
  constructor() {
    this.SERVER_URL = process.env.VUE_APP_SERVER_URL;
    this.TOKEN_URL = this.SERVER_URL + "token/";
    this.REFRESH_URL = this.TOKEN_URL + "refresh/";
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

  async getToken() {
    let access = localStorage.getItem("access");
    const REFRESH = localStorage.getItem("refresh");
    let token = "";

    if (this.tokenExpired(access)) {
      console.log("Access expired");
      //token = await this.refreshToken(REFRESH);
      const { data } = await this.refreshToken(REFRESH);
      if (!data.access) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        access = null;
      } else {
        access = token.access;
        localStorage.setItem("access", access);
      }
    } else {
      console.log("Access still available");
    }
    //Restricción con js
    if (!access || !REFRESH) {
      window.location.href = "login";
    }

    token = { access, refresh: REFRESH };
    return token;
  }

  decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  tokenExpired(token) {
    token = this.decodeToken(token);
    console.log(token, "decodificado");
    let expired = false;
    if (token) {
      const current_time = Date.now() / 1000;
      if (token.exp < current_time) {
        expired = true;
      }
    } else {
      expired = true;
    }
    console.log(expired, "expired");
    return expired;
  }
  refreshToken = async (refresh) => {
    const data = { refresh };
    let token = null;

    /*  try {
      const r = await fetch(this.REFRESH_URL, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      token = await r.json();
    } catch (error) {
      console.log(error.toString());
      token = null;
    }
    return token; */
    try {
      token = await axios.post("token/refresh/", data);
      console.log(token);
      return token;
    } catch (error) {
      console.log(error.response);
      return token;
    }
  };
}
