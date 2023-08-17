import { get, post, postForm, put, deleteData } from './instanse';

const joinApi = (data) => {
  const reqPath = '/user';
  return post(reqPath, data);
};

const modifyProfileApi = (data) => {
  const reqPath = '/user';
  return put(reqPath, data);
};

const loginApi = (data) => {
  const reqPath = '/user/login';
  return post(reqPath, data);
};

const getProfileApi = (accountname) => {
  const reqPath = `/profile/${accountname}`;
  return get(reqPath);
};

const emailApi = (data) => {
  const reqPath = '/user/emailvalid';
  return post(reqPath, data);
};

const accountnameApi = (data) => {
  const reqPath = '/user/accountnamevalid';
  return post(reqPath, data);
};

const myInfoApi = () => {
  const reqPath = '/user/myinfo';
  return post(reqPath);
};

const getUserInfoApi = () => {
  const reqPath = '/user/myinfo';
  return get(reqPath);
};

const followApi = (targetuser, isFollowing) => {
  const reqPath = `/profile/${targetuser}/${isFollowing ? 'unfollow' : 'follow'}`;
  return isFollowing ? deleteData(reqPath) : post(reqPath);
};

export { joinApi, modifyProfileApi, loginApi, getProfileApi, emailApi, accountnameApi, myInfoApi, getUserInfoApi, followApi };
