const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');

const dayText = document.getElementById('days');
const monthText = document.getElementById('months');
const yearText = document.getElementById('years');

const calculateBtn = document.querySelector('.arrow-icon');

const dayEmpty = document.getElementById('day-empty');
const dayInvalid = document.getElementById('day-invalid');
const dayInputContainer = document.getElementById('day-input-container')

const monthEmpty = document.getElementById('month-empty');
const monthInvalid = document.getElementById('month-invalid');
const monthInputContainer = document.getElementById('month-input-container')

const yearEmpty = document.getElementById('year-empty')
const yearInvalid = document.getElementById('year-invalid')
const yearInputContainer = document.getElementById('year-input-container')

calculateBtn.addEventListener('click', () => {

    let result = validateDate(dayInput.value, monthInput.value, yearInput.value)

    if(result === false){
        dayText.innerHTML = '--';
        monthText.innerHTML = '--';
        yearText.innerHTML = '--';

        return;
    }

    let age = calculateAge(dayInput.value, monthInput.value, yearInput.value)

    if(age.years < 0){
        yearInvalid.classList.add('open')
        yearInputContainer.classList.add('error')

        dayText.innerHTML = '--';
        monthText.innerHTML = '--';
        yearText.innerHTML = '--';
        return;
    }

    dayText.innerHTML = age.days;
    monthText.innerHTML = age.months;
    yearText.innerHTML = age.years;
});

function validateDate(day, month, year){

    let today = new Date();

    let dayErrorflag =false;
    let monthErrorflag =false;
    let yearErrorflag =false;
    
    if(day === ''){
        dayEmpty.classList.add('open')
        dayInputContainer.classList.add('error')
        dayErrorflag = true;
    }
    else{
        dayEmpty.classList.remove('open')
    }

    const lastDayOfMonth = new Date(year, month, 0).getDate(); // O ayın son günü

    if (day < 1 || day > lastDayOfMonth) {
        dayInvalid.classList.add('open')
        dayInputContainer.classList.add('error')
        dayErrorflag = true;
    }
    else{
        dayInvalid.classList.remove('open')
    }

    if(month === ''){
        monthEmpty.classList.add('open')
        monthInputContainer.classList.add('error')
        monthErrorflag = true;
    }
    else{
        monthEmpty.classList.remove('open')
    }

    if(month > 12){
        monthInvalid.classList.add('open')
        monthInputContainer.classList.add('error')
        monthErrorflag = true;
    }else{
        monthInvalid.classList.remove('open')
    }
    
    if(year === ''){
        yearEmpty.classList.add('open')
        yearInputContainer.classList.add('error')
        yearErrorflag = true;
    }
    else{
        yearEmpty.classList.remove('open')
    }

    if(year > today.getFullYear()){
        yearInvalid.classList.add('open')
        yearInputContainer.classList.add('error')
        yearErrorflag = true;
    }
    else{
        yearInvalid.classList.remove('open')
    }

    if(dayErrorflag === false){
        dayInputContainer.classList.remove('error');
    }
    if(monthErrorflag === false){
        monthInputContainer.classList.remove('error');
    }
    if(yearErrorflag === false){
        yearInputContainer.classList.remove('error');
    }

    return !(dayErrorflag || monthErrorflag || yearErrorflag);
}


function calculateAge(day, month, year){
    const today = new Date();

    let years = today.getUTCFullYear() - year;
    let months = today.getUTCMonth() + 1 - month;
    let days = today.getUTCDate() - day;

    // Gün farkı negatifse, bir ay geri git
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate(); // Önceki ayın gün sayısını ekle
  }

  if (months < 0) {
    years--;
    months += 12; // Ay farkını düzelterek 12 ay ekle
  }

    return {days, months, years }
}