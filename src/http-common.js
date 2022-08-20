import axios from "axios";

export default axios.create({
  baseURL: "https://thingproxy.freeboard.io/fetch/https://ticket-manager-nandan.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    // 'Origin': 'https://ticket-manager-nandan.herokuapp.com/api/tasks'
  }
});
