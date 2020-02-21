import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { IActivity } from '../interfaces/IActivity';

axios.defaults.baseURL = 'http://localhost:5000/api';

//when errors come back we intercept them and do something with them
axios.interceptors.response.use(undefined, error => {
    const { status, data, config } = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if (
        status === 400 &&
        config.method === 'get' &&
        data.errors.hasOwnProperty('id')
    ) {
        history.push('/notfound');
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => {
    return new Promise<AxiosResponse>(resolve =>
        setTimeout(() => resolve(response), ms)
    );
};

const sleepTime = 1000;

const requests = {
    get: (url: string) =>
        axios
            .get(url)
            .then(sleep(sleepTime))
            .then(responseBody),
    post: (url: string, body: {}) =>
        axios
            .post(url, body)
            .then(sleep(sleepTime))
            .then(responseBody),
    put: (url: string, body: {}) =>
        axios
            .put(url, body)
            .then(sleep(sleepTime))
            .then(responseBody),
    delete: (url: string) =>
        axios
            .delete(url)
            .then(sleep(sleepTime))
            .then(responseBody)
};

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post(`/activities`, activity),
    update: (activity: IActivity) =>
        requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete(`/activities/${id}`)
};

export default {
    Activities
};
