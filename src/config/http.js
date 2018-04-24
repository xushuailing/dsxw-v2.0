import Axios from 'axios';

export default {
  get(url, data = {}) {
    return Axios.get(url, { params: data });
  },
  post(url, data = {}) {
    return Axios.post(url, data);
  },
};
