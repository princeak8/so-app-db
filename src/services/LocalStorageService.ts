export const inStorage = (key: string) => {
    return (localStorage.getItem(key)) ? true : false;
}

export const putInStorage = (key:string, value: string) => {
    localStorage.setItem(key, value);
}

export const storage = (key: string) => {
    return localStorage.getItem(key);
}

export const remove =(key:string) => {
    localStorage.removeItem(key);
}