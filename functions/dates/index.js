function getMonthRange(year, month, day) {
    const nowDate = new Date()
    // const zone = { timeZone: 'Asia/Jerusalem' }
    // const iLZoneDate = new Date().toLocaleString('en-US', zone)// date now
    // const myYear = iLZoneDate.getFullYear();
    // const myMonth = iLZoneDate.getMonth() + 1
    // const myDay = iLZoneDate.getDate()
    const myYear = nowDate.getFullYear();
    const myMonth = nowDate.getMonth() + 1
    const myDay = nowDate.getDate()
    const aa = new Date()


    // תאריך ראשון של החודש
    const startDate = new Date(myYear, myMonth - 1, 1); // month מתחיל ב-0 (ינואר) עד 11 (דצמבר)
    // תאריך אחרון של החודש
    const endDate = new Date(myYear, myMonth, 1); // התאריך 0 של חודש מתייחס ליום האחרון של החודש הקודם



    console.log("1", myYear, myMonth, myDay, " noww " + nowDate, aa)
    console.log("2", startDate, endDate,)
    // console.log("3", iLZoneDate)
    return { start: startDate, end: endDate, nowDate, year, month, day };
}
// דוגמה לשימוש בפונקציה
// const year = new Date().getFullYear();
// const month = new Date().getMonth() + 1 // יולי (month מתחיל ב-1 עד 12)

// const { start, end } = getMonthRange(year, month)

// console.log(start, end)
// console.log(year, month)

getMonthRange()



module.exports = { getMonthRange }
