// Сохранение данных в LocalStorage
export function set(key, value) {

    return localStorage.setItem(key, value);

}

// Получение данных из LocalStorage
export function get(key) {

    return localStorage.getItem(key);

}

// Удаление данных из LocalStorage
export function remove(key) {

    return localStorage.removeItem(key);

}

// Полная очистка LocalStorage
export function removeAll() {

    return localStorage.clear();

}