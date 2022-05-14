const serverErrors = {
    401: "Пользователь с email не найден",
    403: "Извините, но по какой-то причине вам отказано в доступе.",
    404: "Запрашиваемый вами ресурс отсутствует.",
    500: "Внутренняя ошибка сервера.",
    400: "Некорректно заполнено одно из полей ",
};

class ApiAuth {
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
            headers: this._headers,
            method: method,
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        });
    }

    signUp(password, email) {
        return this._fetch("signup", "POST", {
            password: password,
            email: email,
        });
    }

    signIn(password, email) {
        return this._fetch("signin", "POST", {
            password: password,
            email: email,
        });
    }

    async tokenCheck(token) {
        const res = await fetch(`${this._baseUrl}users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: "GET"
        });
        if (res.ok) {
            return res.json();
        }
        return await Promise.reject(res);
    }
}




const apiAuth = new ApiAuth(
    {
        baseUrl: "https://api.mydomain.mesto.nomoreparties.sbs",
        headers: {
            "Content-Type": "application/json",
        },
    },
    serverErrors
);

export default apiAuth;
