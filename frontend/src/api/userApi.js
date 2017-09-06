import { apiUrl } from '../config';

// Получение списка графиков
export function signIn(providerUserId, userName, provider) {

    let searchParams = new URLSearchParams();

    searchParams.append('providerUserId', providerUserId);
    searchParams.append('name', userName);
    searchParams.append('provider', provider);

    return fetch(apiUrl + '/user/signin?' + searchParams.toString(),
        {
            method : 'GET'
        })
        .then((response) => response.json())
        .then((json) => { return json });

}