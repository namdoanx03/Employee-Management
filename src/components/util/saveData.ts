/**
 * ham luu du lieu
 * @param key  key cua du lieu can luu
 * @param value du lieu can luu
 */

export const saveData = (key:string , value: any) => {
    localStorage.setItem(key,JSON.stringify(value))
}
