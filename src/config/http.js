import Axios from 'axios';

export default {
  GET(url, data = {}) {
    return Axios.get(url, { params: data });
  },
  POST(url, data = {}) {
    return Axios.post(url, data);
  },
};
