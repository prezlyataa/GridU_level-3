import axios from 'axios';

class HttpService {
    get(url, options) {
        return axios.get(url, options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    post(url, data, options) {
        return axios.post(url, data, options)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    put(url, data, options) {
        axios.put(url, data, options)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            });
    }

    delete(url, options) {
        axios.delete(url, options)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            });
    }
}

export default HttpService;