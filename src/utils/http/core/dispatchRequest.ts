import adapter from '../adapters';
import { HttpRequestConfig } from '@/types/http';

export default (config: HttpRequestConfig) => {
  return adapter(config);
};
