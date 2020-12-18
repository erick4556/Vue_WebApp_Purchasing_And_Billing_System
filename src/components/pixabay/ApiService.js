import api from "./axios";

const API_KEY = process.env.VUE_APP_KEY;

class ApiService {
  getImages = async (data, pg = 1) => {
    try {
      const encode = encodeURIComponent(data); //Para encapsular el texto
      const cadena = `?key=${API_KEY}&q=${encode}&lang=es&page=${pg}`;
      const response = await api.get(cadena);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new ApiService();
