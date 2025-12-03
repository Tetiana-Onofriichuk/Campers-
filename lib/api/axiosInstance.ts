import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export default axiosInstance;
