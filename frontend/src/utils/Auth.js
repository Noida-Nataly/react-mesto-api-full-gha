import {authBaseUrl} from "./data";

class Auth {
    constructor (authBaseUrl) {
        this._baseUrl = authBaseUrl;
    }

    _checkResponse(res) {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    _request (url,parametrs){
        return fetch(this._baseUrl+url, parametrs).then(this._checkResponse)
    }

    _sendRequest(url, email, password) {
        const parameters = {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }

        return this._request(url, parameters)
    }

    registerUser(email, password) {
        return this._sendRequest('/signup', email, password);
    }

    authorizeUser(email, password) {
        return this._sendRequest('/signin', email, password);
    }

    getContent (token) {
        return this._request('/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        })
    }

}

export const auth = new Auth(authBaseUrl);