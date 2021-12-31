import axios from 'axios';

const API_URL = 'https://localhost:44311/api/users/';

class AuthService {
  handleAuthentication = () => {
    const accessToken = this.getAccessToken();
    if (!accessToken || !this.isValidToken(accessToken)) return;
    this.setSession('accessToken', accessToken);
  };

  login = async (username: string, password: string, rememberMe: boolean) => {
    const accessToken = '1929312831903129321';
    this.setSession('accessToken', accessToken);
    return axios
      .post(`${API_URL}login`, {
        username,
        password,
        rememberMe,
      })
      .then((response) => {
        const userStringify = response.data;
        this.setSession('user', userStringify);
        return response.data;
      });
  };

  setSession = (key: string, accessToken: string) => {
    localStorage.setItem(key, accessToken);
  };

  logOut = () => {
    localStorage.clear();
  };

  getUser = () => {
    const user = localStorage.getItem('user') || '';
    return user;
  };

  getAccessToken = () => localStorage.getItem('accessToken');

  isAuthenticated = () => !!this.getAccessToken();

  isValidToken = (accessToken: string | null) => {
    const expireTime = 1606275140.897;
    if (!accessToken) return false;

    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  };
}

const authService = new AuthService();

export default authService;
