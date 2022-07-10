import axios from "axios";
// const URL = process.env.REACT_APP_ADMIN_REQUEST;
const URL = "http://localhost:8800/api/"
const token  = JSON.parse(window.localStorage.getItem("user"))?.token || "";
const Axios = axios.create({
    baseURL: URL,
    headers: {
       token: `Bearer ${token}` 
    }
});

export default Axios;