import axios from "axios";

export default(url=import.meta.env.VITE_COINGECKO_API_URL) => {
  return axios.create({
    baseURL: url
  })
}