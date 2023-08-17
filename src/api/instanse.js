const url = 'https://api.mandarin.weniv.co.kr';

// get
const get = async (reqPath) => {
  const token = localStorage.getItem('token');
  const reqUrl = url + reqPath;
  return await fetch(reqUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
};

// json post
const post = (reqPath, data) => {
  const reqUrl = url + reqPath;
  const token = localStorage.getItem('token');

  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(reqUrl, options);
};

// form post
const postForm = async (reqPath, formData) => {
  const reqUrl = url + reqPath;
  return await fetch(reqUrl, {
    method: 'POST',
    body: formData,
  });
};

// put
const put = async (reqPath, data) => {
  const token = localStorage.getItem('token');
  const reqUrl = url + reqPath;

  return await fetch(reqUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// delete
const deleteData = async (reqPath) => {
  const token = localStorage.getItem('token');
  const reqUrl = url + reqPath;
  return await fetch(reqUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export { get, post, postForm, put, deleteData };
