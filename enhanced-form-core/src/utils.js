export function uniqueId() {
    return String(
        Date.now().toString(32) +
        Math.random().toString(16)
    ).replace(/\./g, '');
}

export function parseJson(value, defaultValue = null){
    try{
        return JSON.parse(value);
    }catch(error){
        return defaultValue;
    }
}
