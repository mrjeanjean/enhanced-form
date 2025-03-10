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
        console.warn(error.message)
        return defaultValue;
    }
}

export function moveItemListAt(list, fromIndex, toIndex){
    const item = list.splice(fromIndex, 1);
    return [...list.slice(0, toIndex), ...item, ...list.slice(toIndex)];
}

export function unWrap(data){
    return JSON.parse(JSON.stringify(data));
}
