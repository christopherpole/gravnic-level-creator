import axios from 'axios';

export const fetchLevels = async () =>
  axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels`).then(res => res.data);

export const createLevel = async level =>
  axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels`, level).then(res => res.data);
