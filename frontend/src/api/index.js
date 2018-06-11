import axios from 'axios';

export const fetchLevels = async () =>
  axios.get(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels`).then(res => res.data);

export const createLevel = async level =>
  axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels`, level).then(res => res.data);

export const deleteLevel = async id =>
  axios.delete(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels/${id}`).then(res => res.data);

export const updateLevel = async level =>
  axios
    .put(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels/${level.id}`, level)
    .then(res => res.data);

export const updateLevels = async levels =>
  axios.put(`${process.env.REACT_APP_BACKEND_ENDPOINT}/levels`, levels).then(res => res.data);

export const findQuickestSolution = async () =>
  new Promise(accept => {
    setTimeout(() => {
      accept();
    }, 1000);
  });
