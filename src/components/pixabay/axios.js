import Axios from "axios";

export default Axios.create({
  baseURL: "https://pixabay.com/api/",
  headers: {
    "Content-type": "application/json",
  },
});
