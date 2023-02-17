//Dark Mode Toggle
document.querySelector('.dark-mode-switch').onclick = () => {
    document.querySelector('body').classList.toggle('dark');
    document.querySelector('body').classList.toggle('light');
};

//Check Year
isCheckYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0)
        || (year % 100 === 0 && year % 400 === 0)
};

getFebDays = (year) => {
    return isCheckYear(year) ? 29 : 28
};

let calendar = document.querySelector('.calendar');
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let monthPicker = document.querySelector('#month-picker');

monthPicker.onclick = () => {
    monthList.classList.add('show')
};

//Generate Calendar
generateCalendar = (month, year) => {
    let calendarDay = document.querySelector('.calendar-day');
    calendarDay.innerHTML = '';

    let calendarHeaderYear = document.querySelector('#year');
    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let currDate = new Date();

    monthPicker.innerHTML = monthNames[month];
    calendarHeaderYear.innerHTML = year;

    let firstDay = new Date(year, month, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= firstDay.getDay()) {
            day.classList.add('calendarDayHover')
            day.innerHTML = i - firstDay.getDay() + 1
            day.innerHTML += `<span></span>
                             <span></span>
                             <span></span>
                             <span></span>`
            if (i - firstDay.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('currDate')
            }
        }
        calendarDay.appendChild(day)
    };
};

let monthList = calendar.querySelector('.month-list');
monthNames.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month.onclick = () => {
        monthList.classList.remove('show')
        currMonth.value = index
        generateCalendar(currMonth.value, currYear.value)
    }
    monthList.appendChild(month)
});

document.querySelector('#prev-year').onclick = () => {
    --currYear.value
    generateCalendar(currMonth.value, currYear.value)
};

document.querySelector('#next-year').onclick = () => {
    ++currYear.value
    generateCalendar(currMonth.value, currYear.value)
};

let currDate = new Date();
let currMonth = { value: currDate.getMonth() };
let currYear = { value: currDate.getFullYear() };

generateCalendar(currMonth.value, currYear.value);