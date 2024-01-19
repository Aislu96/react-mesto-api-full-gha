export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then((response) => {
        try {
            if (response.status === 201) {
                return response.json();
            }
        } catch (e) {
            return (e)
        }
    })
};


export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    }).then((response) => {
        try {
            if (response.status === 200) {
                return response.json();
            }
        } catch (e) {
            return (e)
        }
    }).then((res) => {
        if (res.token) {
            localStorage.setItem('jwt', res.token);
            return res;
        } else {
            return;
        }
    })
};


export const getContent = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        .then(data => data)
}