import axios from "axios";

export default axios.create({
  baseURL: "https://ticket-manager-nandan.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    // 'Origin': 'https://ticket-manager-nandan.herokuapp.com/api/tasks'
  }
});
