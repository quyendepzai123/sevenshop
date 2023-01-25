import { setAuthTokens } from 'react-native-axios-jwt';
import { API_ROUTES } from 'global/constants';
import { TypeReturn } from 'interfaces/APIResponse';
import { RefreshTokenPayload, SignInPayload, GetMeSuccessData } from 'interfaces/Auth';
import { axiosInstance } from './config/AxiosInstance';

const authAPI = {
  async login(payload: SignInPayload) {
    const response = await axiosInstance.post(API_ROUTES.login, payload);
    try {
      await setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
    } catch (error) {
      console.error(error);
    }
    return response;
  },
  me(): TypeReturn<GetMeSuccessData> {
    return axiosInstance.get(API_ROUTES.me);
  },
  logout(payload: RefreshTokenPayload): TypeReturn<null> {
    return axiosInstance.post(API_ROUTES.logout, payload);
  },
};

export default authAPI;
