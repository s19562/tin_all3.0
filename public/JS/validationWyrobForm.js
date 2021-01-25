function validateForm() {
    
    const NazwaInput = document.getElementById('name');
    const CenaInput = document.getElementById('cenaSz');
   

    const errorNazwa = document.getElementById('errorNazwa');
    const errorCena = document.getElementById('errorCena');
  
    
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([NazwaInput, CenaInput] ,[errorNazwa, errorCena], errorsSummary);

    let valid = true;

    if (!checkRequired(NazwaInput.value)) {
        valid = false;
        NazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(NazwaInput.value, 2, 60)) {
        valid = false;
        NazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(CenaInput.value)) {
        valid = false;
        CenaInput.classList.add("error-input");
        errorCena.innerText = "Pole jest wymagane";
    } else if (!checkPrice(CenaInput.value)) {
        valid = false;
        CenaInput.classList.add("error-input");
        errorCena.innerText = "Pole powinno zawierać prawidłową cenę np 1.20";
    }



    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}