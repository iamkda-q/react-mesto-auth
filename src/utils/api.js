const serverErrors = {
    400: "Запрос сформирован неправильно, проверьте, валидны ли данные",
    401: "Извините, но по какой-то причине вам отказано в доступе.",
    403: "Извините, но по какой-то причине вам отказано в доступе.",
    404: "Запрашиваемый вами ресурс отсутствует.",
    500: "Внутренняя ошибка сервера.",
};

class Api {
    constructor(options, serverErrors) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._serverErrors = serverErrors;
    }

    errorHandler(errorStatus) {
        if (Object.keys(this._serverErrors).includes(String(errorStatus))) {
            return this._serverErrors[errorStatus];
        }
        return "Ошибка.";
    }

    _fetch(cont, method = "GET", body = undefined) {
        return fetch(`${this._baseUrl}${cont}`, {
            headers: {...this._headers, authorization: `Bearer ${localStorage.getItem("usersToken")}`},
            method: method,
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }

    getInitialCards() {
        return this._fetch("cards");
    }

    getInitialUserInfo() {
        return this._fetch("users/me");
    }

    setUserInfo(body) {
        return this._fetch("users/me", "PATCH", body);
    }

    setNewCard(body) {
        return this._fetch("cards", "POST", body);
    }

    deleteCard(cardID) {
        return this._fetch(`cards/${cardID}`, "DELETE");
    }

    changeLike(cardID, isLiked) {
        if (isLiked) {
            return this._fetch(`cards/${cardID}/likes`, "DELETE");
        }
        return this._fetch(`cards/${cardID}/likes`, "PUT");
    }

    updateAvatar(body) {
        return this._fetch(`users/me/avatar`, "PATCH", body);
    }
}

const api = new Api(
    {
        baseUrl: "https://api.mydomain.mesto.nomoreparties.sbs",
        headers: {
            "Content-Type": "application/json",
        },
    },
    serverErrors
);

export default api;
