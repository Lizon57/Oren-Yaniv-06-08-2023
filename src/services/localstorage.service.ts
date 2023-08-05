const read = (storageKey: string) => {
    const value = localStorage.getItem(storageKey)
    if (!value) return
    return JSON.parse(value)
}

const save = <T>(storageKey: string, value: T) => {
    localStorage.setItem(storageKey, JSON.stringify(value))
}

const saveToMap = <T>(storageKey: string, mapKey: string, value: T) => {
    const map = read(storageKey) || {}
    map[mapKey] = value
    save(storageKey, map)
}


export const localStorageService = {
    read,
    save,
    saveToMap
}