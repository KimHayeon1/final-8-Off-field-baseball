import { get, post, deleteData } from './instanse';

const commentReportApi = (id, commentId) => {
  const reqPath = `/post/${id}/comments/${commentId}/report`;
  return post(reqPath);
};

const commentDeleteApi = (id, commentId) => {
  const reqPath = `/post/${id}/comments/${commentId}`;
  return deleteData(reqPath);
};

const commentSubmitApi = (id, data) => {
  const reqPath = `/post/${id}/comments`;
  return post(reqPath, data);
};

const getCommentListApi = (id) => {
  const reqPath = `/post/${id}/comments/?limit=10000`;
  return get(reqPath);
};
export { commentReportApi, commentDeleteApi, commentSubmitApi, getCommentListApi  };

