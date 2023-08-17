import { postForm } from './instanse';

// oneImageApi -> uploadFileApi 이름 변경 고민중
const oneImageApi = (data) => {
  const reqPath = '/image/uploadfile';
  return postForm(reqPath, data);
};

const uploadFilesApi = (data) => {
  const reqPath = '/image/uploadfiles';
  return postForm(reqPath, data);
};


export { oneImageApi, uploadFilesApi };
