// import { API_URL } from 'global/config';
import { API_ROUTES } from 'global/constants';
import { axiosInstance } from './config/AxiosInstance';

const orderAPI = {
  async getOrders() {
    const response = await axiosInstance.get(API_ROUTES.getOrders);
    return response;
  },
  async getOrderById(id: string) {
    const response = await axiosInstance.get(API_ROUTES.getOrderById(id));
    return response;
  },
};

export default orderAPI;
