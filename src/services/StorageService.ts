
export function StorageService() {
    return {    
        get(key: string) {
            return JSON.parse(localStorage.getItem(key) as string)
        },
        set(key: string, data: any) {
            return localStorage.setItem(key, JSON.stringify(data))
        },
        remove(key: string) {
            return localStorage.removeItem(key)
        }
    }
}

