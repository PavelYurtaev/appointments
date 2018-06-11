import 'whatwg-fetch'

const callApi = (path, method, request) => {

    let apiUrl = (path) => {
        return 'http://127.0.0.1:8080/' + path;
    };

    let fetchData = {
        method: method,
        body: JSON.stringify(request),
        mode: 'no-cors',
        headers: {
            'contentType': 'application/json',
            'responseType': 'json',
            'accept': 'application/json',

            // 'Accept': 'application/json'
        }
    };

    return fetch(apiUrl(path), fetchData)
        .then(response => response.json())
        .catch(error => {alert('Failed api call url: ' + apiUrl(path) + ' ' + error.message); // TODO
            throw error;
        });
};

export default callApi;
