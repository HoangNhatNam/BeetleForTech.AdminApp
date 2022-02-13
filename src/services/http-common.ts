import axios from 'axios';
import { HttpConfig } from 'configs';

export default axios.create({
  baseURL: `${HttpConfig.BaseURL}api`,
  headers: {
    'Content-type': 'application/json',
  },
});
