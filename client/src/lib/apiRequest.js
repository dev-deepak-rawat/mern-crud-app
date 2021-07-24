import { SERVICE_URL } from "./constants";

const apis = {
    fetchUsers: {
        url: '/users/',
        method: 'GET',
    },
    updateUser: {
        url: '/users/',
        method: 'PUT'
    },
    createUser: {
        url: '/users/',
        method: 'POST',
        firebase: async (user) => usersRef.push(item),
    },
    deleteUser: {
        url: '/users/',
        method: 'DELETE'
    }
}

export const apiRequest = async (params = {}) => {
    const { api = '', urlAppend = '', content = {} } = params;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: apis[api].method,
        headers: myHeaders,
        body: JSON.stringify(content),
        redirect: 'follow'
    };
    if (requestOptions.method === 'GET') {
        delete requestOptions.body;
    }
    let response = false;
    try {
        const _response = await fetch(`${SERVICE_URL}${apis[api].url}${urlAppend}`, requestOptions);
        response = await _response.json();
        console.log({ response })

    } catch (err) {
        console.log('error', err);
    } finally {
        return response;
    }
}