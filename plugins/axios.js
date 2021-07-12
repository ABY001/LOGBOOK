export default function({ $axios }, inject) {
  const axios = $axios.create({
    baseURL: "https://logbook-backend.herokuapp.com"
  });
  inject("axios", axios);
}
