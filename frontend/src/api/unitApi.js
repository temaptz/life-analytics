import { apiUrl } from '../config';
import * as storage from '../constants/Storage';
import * as browserStorage from '../helpers/browserStorage';

// Получение списка единиц измерения
export function getUnitList() {

    return fetch(apiUrl + '/unit',
        {
            method : 'GET',
            headers: {
                'Authorization': 'Token ' + browserStorage.get(storage.USER_TOKEN)
            }
        })
        .then((response) => response.json())
        .then((json) => { return json });

}