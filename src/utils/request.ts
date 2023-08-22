import { ElMessage } from 'element-plus'
import axios from 'axios';

axios.defaults.timeout = 1000000; // 超时时间设置大一点，防止上传文件超时
axios.defaults.headers.common.Accept = '*/*';
axios.defaults.headers.common['Content-Type'] = 'application/json';

interface IFetch {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
}

function fetch({ url, method, data }: IFetch) {

  switch (method) {
    case 'get':
      return axios.get(url, { params: data });
    case 'post':
      return axios.post(url, data);
    case 'put':
      return axios.put(url, data);
    case 'delete':
      return axios.delete(url, data);
    default:
      return axios.get(url, { params: data });
  }
}

export default async function request({ url, method, data }: IFetch) {
  try {
    const res = await fetch({ url, method, data });

    console.log('res =>> ', res);

    if (res.status === 200) {
      if (res.data) {
        return res.data;
      }
      ElMessage.error(res.data.message);
      return Promise.reject(res.data);
    }
    ElMessage.error(res.statusText);
    return Promise.reject(res.data);
  } catch (error: any) {
    ElMessage.error(error.response.message);
    return Promise.reject(error.response);
  }
}
