class Api {
    #url;

    constructor({url}) {
        this.#url = url;
    }

    _sendRequest(url, options) {
        return fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
    }

    getCards() {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/cards`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            }
        });
    }

    getUser() {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/users/me`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
        });
    }

    patchUser(data) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    postCard(data) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
    }

    deleteCard(id) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
        });
    }

    likeCard(id) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
        });
    }

    deleteLikeCard(id) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
        });
    }

    patchAvatar(data) {
        const token = localStorage.getItem('jwt');
        return this._sendRequest(`${this.#url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        });
    }
}

// const api = new Api({
//     url: 'https://mesto.nomoreparties.co/v1/cohort-75',
//     headers: {
//         authorization: '8f0f3959-562a-4d67-8672-647db07d1306',
//         'Content-Type': "application/json"
//     }
// });
const api = new Api({
    url: 'https://api.kharisova.nomoredomainsmonster.ru',
});

export default api;