export function apiService() {

    const apiURI = 'http://localhost:3000/api';

    const get = (url) => {
        return fetch(`${apiURI}${url}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err));
    }
}
