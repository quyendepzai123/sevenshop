// import { API_URL } from 'global/config';
import { API_ROUTES } from 'global/constants';
import { axiosInstance } from './config/AxiosInstance';

const productAPI = {
  getProducts(page: number, limit: number) {
    return axiosInstance.get(API_ROUTES.getProducts(page, limit));
  },

  getProductFlashSale() {
    return axiosInstance.get(API_ROUTES.getProductsFlashSale);
  },

  getFavoritesProduct() {
    return axiosInstance.get(API_ROUTES.getFavoritesProduct);
  },

  async getProductID(id: string) {
    const response = await axiosInstance.get(API_ROUTES.getProductDetail(id));
    return response.data;
  },
  updateFavorite(id: string) {
    return axiosInstance.post(API_ROUTES.updateFavorite(id));
  },
};

export default productAPI;
