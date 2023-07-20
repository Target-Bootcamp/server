function getMonthRange(year, month) {
    // תאריך ראשון של החודש
    const startDate = new Date(year, month - 1, 1); // month מתחיל ב-0 (ינואר) עד 11 (דצמבר)
    // תאריך אחרון של החודש
    const endDate = new Date(year, month, 0); // התאריך 0 של חודש מתייחס ליום האחרון של החודש הקודם

    return { start: startDate, end: endDate };
}
// דוגמה לשימוש בפונקציה
const year = 2023;
const month = 7; // יולי (month מתחיל ב-1 עד 12)

const { start, end } = getMonthRange(year, month)

// console.log(start, end)

module.exports = { getMonthRange }
