import { deleteData, get, post, put } from './instanse';

const getPostApi = (id) => {
  const reqPath = `/post/${id}`;
  return get(reqPath);
};

const modifyPostApi = (id, data) => {
  const reqPath = `/post/${id}`;
  return put(reqPath, data);
};

const followingPostListApi = (numPost) => {
    const reqPath = `/post/feed/?limit=10&skip=${numPost}`;
    return get(reqPath);
  };

  const postApi = (data) => {
    const reqPath = '/post';
    return post(reqPath, data);
  };

const reportPostApi = (id) => {
  const reqPath = `/post/${id}/report`;
  return post(reqPath);
};

const deletePostApi = (id) => {
  const reqPath = `/post/${id}`;
  return deleteData(reqPath);
};

const myPostListApi = (accountname, numPost) => {
  const reqPath = `/post/${accountname
  }/userpost?limit=10&skip=${numPost}`;
  return get(reqPath);
};

export { getPostApi, followingPostListApi, postApi, modifyPostApi, reportPostApi, deletePostApi, myPostListApi };
