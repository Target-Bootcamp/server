// יצירת אובייקט המייצג את התאריך והשעה הנוכחיים
const now = new Date();

// קבלת היום, החודש והשנה
function getDate () {
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = (now.getFullYear() % 100).toString().padStart(2, '0');

    const fullDate = `${day}-${month}-${year}`;
    return fullDate
}
// קבלת השעה, הדקה והשנייה
function getOuerMS () {
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const millisecond = now.getMilliseconds().toString().padStart(3, '0');
    
    const fullOuer = `${hour}-${minute}-${second}.${millisecond}`
    return fullOuer
}
function getOuer (){
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    const fullOuer = `${hour}:${minute}`
    return fullOuer
}


// יצירת פורמט התאריך והשעה הרצוי
const fuulDateOver = `${getDate()}__${getOuerMS()}`


module.exports = {getOuerMS,getDate,getOuer,fuulDateOver}