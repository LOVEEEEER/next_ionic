import axios from 'axios';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  function (config) {
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

function transormData(data) {
  return data && !data._id
    ? Object.keys(data).map(key => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  function (res) {
    if (configFile) {
      res.data = { content: transormData(res.data) };
    }
    return res;
  },
  function (err) {
    return Promise.reject(err);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete,
};

export default httpService;
