// import { API_URL } from 'global/config';
import { API_ROUTES } from 'global/constants';
import { Checkout, getInvoice, StripeCheckout } from 'interfaces/Checkout';
import { axiosInstance } from './config/AxiosInstance';

const checkoutAPI = {
  async checkout(data: Checkout) {
    const response = await axiosInstance.post(API_ROUTES.checkout, data);
    return response;
  },

  async stripe(data: StripeCheckout) {
    const response = await axiosInstance.post(API_ROUTES.stripe, data);
    return response.data;
  },

  async getInvoice(data: getInvoice) {
    const response = await axiosInstance.post(API_ROUTES.getInvoice, data);
    return response;
  },
};
export default checkoutAPI;
