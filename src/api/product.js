import { get, post, put, deleteData } from './instanse';

const productDetailApi = (id) => {
  const reqPath = `/product/detail/${id}`;
  return get(reqPath);
};

const productUploadApi = (data) => {
    const reqPath = '/product';
    return post(reqPath, data);
  };

const productEditApi = (id, data) => {
  const reqPath = `/product/${id}`;
  return put(reqPath, data);
};

const beforeProductEditApi = (id) => {
  const reqPath = `/product/detail/${id}`;
  return get(reqPath);
};

const deleteProductApi = (id) => {
  const reqPath = `/product/${id}`;
  return deleteData(reqPath);
};

const productListApi = (accountname) => {
  const reqPath = `/product/${accountname}`;
  return get(reqPath);
};

export { productDetailApi, productUploadApi, productEditApi, beforeProductEditApi, deleteProductApi, productListApi };
