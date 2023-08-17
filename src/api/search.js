import { get } from './instanse';

const searchApi = (keyword) => {
  const reqPath = `/user/searchuser/?keyword=${keyword}`;
  return get(reqPath);
};

export { searchApi };
