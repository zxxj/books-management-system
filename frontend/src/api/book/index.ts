import { apiInstance } from '..';

export const list = () => {
  return apiInstance.get('/book/list');
};
