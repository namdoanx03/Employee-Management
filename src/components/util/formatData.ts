/**
 * ham format thoi gian yyyy-mm-dd
 * @param date chuoi thoi gian can dinh dang
 * @returns chuoi thoi gian da dinh dang theo format: yyyy-mm-dd
 */

export const formatDate = (date: string): string => {
    const today = new Date(date) // lay ra thoi gian hien tai

    const day = today.getDay() //lay ra ngay
    const month = today.getMonth() // lay ra thang 
    const year = today.getFullYear() // lay ra nam

    return `${year} - ${month} - ${day}`  
}
