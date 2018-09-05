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


// import axios from 'axios'
//
// const BASE_URL = 'http://localhost:3000/api'
//
// const successHandler = response => response.data
// const errorHandler = error => console.log(error)
//
// export const generateHttpHandler =
//   (handler, onSuccess = successHandler, onError = errorHandler) =>
//     handler.then(onSuccess).catch(onError)
//
// export const HttpService = {
//   get(url, config) {
//     return generateHttpHandler(axios.get(url, config))
//   },
//   post(url, data, config) {
//     return generateHttpHandler(axios.post(url, data, config))
//   },
//   put(url, data, config) {
//     return generateHttpHandler(axios.put(url, data, config))
//   },
//   delete(url, config) {
//     return generateHttpHandler(axios.delete(url, config))
//   }
// }
//
// export default {
//   getAllQuestions: () => HttpService.get(`${BASE_URL}/questions`),
//   getQuestionById: id => HttpService.get(`${BASE_URL}/questions/${id}`),
//   updateQuestionDetails: (id, updates) => HttpService.put(`${BASE_URL}/questions/${id}`, updates),
//   addQuestion: question => HttpService.post(`${BASE_URL}/questions`, question),
//   deleteQuestion: id => HttpService.delete(`${BASE_URL}/questions/${id}`)
// }