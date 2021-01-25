function validateForm() {
    
    const firstInput = document.getElementById('klient');
    const secInput = document.getElementById('wyrob');
    const iloscInput = document.getElementById('ilosc');

    const cenaInput = document.getElementById('cenaAll');
    const dataInput = document.getElementById('dataZam');
    
    const rabatInput = document.getElementById('rabat');
    const uwagiInput = document.getElementById('uwaga');

    

    const errorFirst = document.getElementById('errorKlient');
    const errorSec = document.getElementById('errorPaczek');
    const errorIlosc = document.getElementById('errorIlosc');

    const errorCena = document.getElementById('errorCena');
    const errorData = document.getElementById('errorData');

    const errorRabat = document.getElementById('errorRabat');
    const errorUwagi = document.getElementById('errorUwagi');
    
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstInput, secInput, iloscInput , cenaInput, dataInput, rabatInput , uwagiInput], [errorFirst, errorSec , errorIlosc, errorCena, errorData, errorRabat , errorUwagi], errorsSummary);

    let valid = true;

    if (!checkRequired(firstInput.value)) {
        valid = false;
        firstInput.classList.add("error-input");
        errorFirst.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(secInput.value)) {
        valid = false;
        secInput.classList.add("error-input");
        errorSec.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(iloscInput.value)) {
        valid = false;
        iloscInput.classList.add("error-input");
        errorIlosc.innerText = "Pole jest wymagane";
    }else if (!checkNumber(iloscInput.value)) {
        valid = false;
        iloscInput.classList.add("error-input");
        errorIlosc.innerText = "Pole powinno być liczbą";
    }

    if (!checkRequired(cenaInput.value)) {
        valid = false;
        cenaInput.classList.add("error-input");
        errorCena.innerText = "Pole jest wymagane";
    } else if (!checkNumber(cenaInput.value)) {
        valid = false;
        cenaInput.classList.add("error-input");
        errorCena.innerText = "Pole powinno zawierać prawidłową cenę";
    }




    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = nowDate.getFullYear();
    if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;
const nowString = [year, month, day].join('-');

if (!checkRequired(dataInput.value)) {
    valid = false;
    dataInput.classList.add("error-input");
    errorData.innerText = "Pole jest wymagane";
} else if (!checkDate(dataInput.value)) {
    valid = false;
    dataInput.classList.add("error-input");
    errorData.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
} else if (checkDateIfAfter(dataInput.value, nowString)) {
    valid = false;
    dataInput.classList.add("error-input");
    errorData.innerText = "Data nie może być z przyszłości";
}




if (!checkRequired(rabatInput.value)) {
    valid = false;
    rabatInput.classList.add("error-input");
    errorRabat.innerText = "Pole jest wymagane";
} else if(!checkNumberRange(rabatInput.value, 0, 100)){
        valid = false;
        rabatInput.classList.add("error-input");
        errorRabat.innerText = "Pole powinno zawierać poprawny rabar"
    }

    if(!checkUwagi(uwagiInput.value , 300)){
        valid = false;
        uwagiInput.classList.add("error-input");
        errorUwagi.innerText = "Pole nie moze przekraczać 300 znaków";
    }



    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}