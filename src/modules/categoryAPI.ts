// import axios from 'axios';
import { API_URL } from 'global/config';
import { API_ROUTES } from 'global/constants';
import { axiosInstance } from './config/AxiosInstance';

const categoryAPI = {
  getCategories() {
    return axiosInstance.get(API_URL + API_ROUTES.getCategories);
  },
};

export default categoryAPI;
