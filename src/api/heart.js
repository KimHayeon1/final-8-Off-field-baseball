import { deleteData, post } from './instanse';

const heartApi = (id, hearted) => {
  const reqPath = `/post/${id}/${hearted ? 'unheart' : 'heart'}`;
  return hearted? deleteData(reqPath) : post(reqPath) ;
};

export { heartApi };
