

const storage = window.localStorage;

function loadLocalStorage(item) {
    return JSON.parse(storage.getItem(item));
}

function setLocalStorage(item) {
    storage.setItem('list',JSON.stringify(item));
}

function removeAll() {
    storage.clear();
}

function removeItem(item) {
    storage.removeItem(item);
}

function printStorage() {
    const list = JSON.parse(loadLocalStorage('list'));

    console.table(list);
}

export {loadLocalStorage, setLocalStorage, removeAll, removeItem, printStorage};