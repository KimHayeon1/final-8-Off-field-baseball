import { get, post, postForm, put, deleteData } from './instanse';

const joinApi = () => {};

const loginApi = (data) => {
  const reqPath = '/user/login';
  return post(reqPath, data);
};

const getProfileApi = (accountname) => {
  const reqPath = `/profile/${accountname}`;
  return get(reqPath);
};

const emailApi = () => {};

const accountnameApi = () => {};

export { loginApi, getProfileApi };
