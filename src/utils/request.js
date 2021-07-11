import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_S2;
const token = localStorage.getItem('token');

export const sendGet = (url, params) => {
    let promise = new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: API_URL + url,
            params,
            headers: {
                Authorization: token
            }
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
    return promise;
};


export const sendPost = (url, params, data) => {
    let promise = new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: API_URL + url,
            data: data,
            params,
            headers: {
                Authorization: token
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });

    return promise;
};

export const sendPut = (url, params, data) => {
    let promise = new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: API_URL + url,
            params,
            data: data,
            headers: {
                Authorization: token
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });

    return promise;
};

export const sendDelete = (url, params) => {
    let promise = new Promise((resolve, reject) => {
        axios({
            method: "delete",
            url: API_URL + url,
            params,
            headers: {
                Authorization: token
            },
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });

    return promise;
};
