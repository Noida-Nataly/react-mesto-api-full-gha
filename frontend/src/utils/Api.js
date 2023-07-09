import {baseUrl, token} from "./data";


class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }
    _sendRequest(url, parameters) {
    parameters.headers = {
      'Content-Type': 'application/json'
    };
    parameters.credentials = 'include';
    return fetch(url, parameters)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  
  getUserInfo() {
    return this._sendRequest(this._baseUrl+'/users/me', {});
  }
  
  getInitialCards() {
    return this._sendRequest(this._baseUrl+'/cards', {} );
  }
  
  // Изменение данных пользователя на сервере
  editProfile(name, about) {
    return this._sendRequest(this._baseUrl+'/users/me', {
      method: 'PATCH',
        body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
  
  // Обновление аватара на сервере
  updateAvatar(link) {
    return this._sendRequest(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
      })
    });
  }
  
  // Добаление новой карточки на сервер
  addCard(name, link) {
    return this._sendRequest(this._baseUrl + '/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }
  
  // Метод отправки постановки и снятия лайка на сервер
  toggleLike(cardId, isMyLike) {
    if(isMyLike) {
      return this._sendRequest(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'DELETE'
      })
    } else {
      return this._sendRequest(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'PUT'
      })
    }
  }
  
  //Метод удаления карточки на сервере
  deleteCard (cardId) {
    return this._sendRequest(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE'
    })
  }
  
}

export const api = new Api(baseUrl, token);