const api = process.env.REACT_APP_CONTACTS_API_URL|| "http://localhost:8080/";

const headers = {
    'Accept'       : 'application/json',
    'Content-Type' : 'application/json'
}

export const doLogin = (payload) => {
    return fetch(`${api}check`, {
        method  : "POST",
        headers : headers,
        body    : JSON.stringify(payload)
    }).then((res) => res.json())
      .then(res => {return res;})
      .catch(error => {
        console.log("This is error");
        return error;
    });
}


export const doSignUp = (payload) => {
    return fetch(`${api}add`, {
        method : "POST",
        headers : headers,
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
}


export const doDetails = (payload) => {
    return fetch(`${api}enter`,{
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        }).then(res => {
            return res.status;
        }).catch(error => {
            console.log("This is error");
            return error;
        });
}