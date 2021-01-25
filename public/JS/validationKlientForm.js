function validateForm() {
    
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const telInput = document.getElementById('nrTel');
    const uwagiInput = document.getElementById('uwagi');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorTel = document.getElementById('errorNumerTel');
    const errorUwagi = document.getElementById('errorUwagi');
    
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, telInput, uwagiInput], [errorFirstName, errorLastName, errorTel, errorUwagi], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(telInput.value)) {
        valid = false;
        telInput.classList.add("error-input");
        errorTel.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRangeTel(telInput.value, 0, 9)) {
        valid = false;
        telInput.classList.add("error-input");
        errorTel.innerText = "Pole powinno zawierać 0 lub 9 znaków";
    } else if (!checkTel(telInput.value)) {
        valid = false;
        telInput.classList.add("error-input");
        errorTel.innerText = "Pole powinno zawierać prawidłowy numer telefonu";
    }

    if(!checkUwagi(uwagiInput.value , 300)){
        valid = false;
        uwagiInput.classList.add("error-input");
        errorUwagi.innerText = "Pole nie moze przekraczać 300 znaków";
    }

    // if (!checkTextLengthRange(uwagiInput.value, 0, 300)) {
    //     valid = false;
    //     uwagiInput.classList.add("error-input");
    //     errorUwagi.innerText = "Pole powinno zawierać do 300 znaków";
    // }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}