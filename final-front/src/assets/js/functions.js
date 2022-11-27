async function postData(url = '', data = {}) {
    return await fetch(`/api${url}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
}

async function getUserByToken(token) {
    const data = postData('/users/token', {"token": token});
    return (await data).json();
}

export {
    postData,
    getUserByToken
}
