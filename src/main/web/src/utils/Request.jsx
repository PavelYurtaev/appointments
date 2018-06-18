export const apiUrl = path => {
    return 'http://127.0.0.1:8080/' + path;
};

let fetchData = (method, request) => {
    return {
        method: method,
        body: JSON.stringify(request),
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
};

export const callApi = (path, method, request) => {
    return fetch(apiUrl(path), fetchData(method, request))
        .then(response => response.json())
        .catch(error => {
            alert('Failed api call url: ' + apiUrl(path) + ' ' + error.message); // TODO
            throw error;
        });
};

export const callApiNoReturn = (path, method, request) => {
    return fetch(apiUrl(path), fetchData(method, request))
        .catch(error => {
            alert('Failed api call url: ' + apiUrl(path) + ' ' + error.message); // TODO
            throw error;
        });
};

