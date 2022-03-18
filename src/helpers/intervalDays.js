


export const intervalDates = (firtsDate, seconDate) => {
    const { startDay } = intervalDay(firtsDate);
    const { endDay } = intervalDay(seconDate);
    const oneDay = 24 * 60 * 60 * 1000;
    let newDate = firtsDate.getTime();
    let dates = [startDay];
    do {
        dates.push(new Date(newDate))
        newDate = newDate + oneDay
    } while (newDate < endDay.getTime());
    return dates
}

const intervalDay = (date) => {

    const dateString = dateFormat(date)

    const myDate = dateString.split('-');
    // Construimos la fecha inicial del dia Con Horario 00:00:00
    const todayDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);
    // Construimos la fecha inicial del dia posterior Con Horario 00:00:00
    const tomorrowDate = new Date(myDate[0], myDate[1] - 1, (parseInt(myDate[2], 10) + 1 + ''));
    // Los convertimos a segundos
    const startDay = new Date(todayDate.getTime());
    const endDay = new Date(tomorrowDate.getTime() - 1000); // Aqui se le resta un segundo para tener la hora 23:59:59 del dia
    return { startDay, endDay, dateString, year: date.getFullYear() };
}

const dateFormat = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
        return (`${year}-0${month}-${day}`);
    } else {
        return (`${year}-${month}-${day}`);
    }
}