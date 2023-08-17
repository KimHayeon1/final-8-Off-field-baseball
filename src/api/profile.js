import { get } from './instanse';

const profileApi = (accountname) => {
  const reqPath = `/profile/${accountname}`;
  return get(reqPath);
};

const followListApi = (accountname, type) => {
  const reqPath = `/profile/${accountname}/${type}?limit=10000`;
  return get(reqPath);
};

export { profileApi, followListApi };
