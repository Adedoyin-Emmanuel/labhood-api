import axios from "axios";
import { clientSecret } from "../constants";

const Axios = axios.create({
  baseURL: "https://gitlab.com/api/v1",
  headers: {
    Authorization: `Bearer ${clientSecret}`,
    "Content-Type": "application/json",
  },
});
