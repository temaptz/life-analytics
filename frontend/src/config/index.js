const localApiUrl      = 'http://localhost:8000';
const productionApiUrl = '/api';

let currentApiUrl = productionApiUrl;

if ( process.env.NODE_ENV === 'development' ) {
    currentApiUrl = localApiUrl;
}

export const apiUrl         = currentApiUrl;
export const googleClientId = '950154841564-2sv9i8qvhpriadqckbvreg3ki93g15h9.apps.googleusercontent.com';