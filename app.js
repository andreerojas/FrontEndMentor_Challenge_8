const userName = document.querySelector('#cardholder-name');
const cardNumber = document.querySelector('#card-number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc');
const form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
const cardNumberSpan = document.querySelector('#cardNumberSpan');
const userNameSpan = document.querySelector('#userNameSpan');
const expiracySpan = document.querySelector('#expiracySpan');

function formatCardNumber(number) {
    number = number.replaceAll(" ", "");
    return number.split("").reduce((acc, el, idx) => (((idx !== 0) && (idx % 4 === 0)) ? acc += " " + el : acc + el), "");
}

function formatDate(date) {
    const re = /^\d$/;
    if (re.test(date)) {
        date = "0" + date;
    }
    return date;
}

userName.addEventListener('input', function () {
    userNameSpan.innerText = userName.value;
})

cardNumber.addEventListener('input', function () {
    cardNumber.value = formatCardNumber(cardNumber.value)
    cardNumberSpan.innerText = cardNumber.value;
})

month.addEventListener('focusout', function () {
    month.value = formatDate(month.value);
    expiracySpan.innerText = month.value + "/" + year.value;
})

year.addEventListener('focusout', function () {
    year.value = formatDate(year.value);
    expiracySpan.innerText = month.value + "/" + year.value;
})

month.addEventListener('input', function () {
    expiracySpan.innerText = month.value + "/" + expiracySpan.innerText.slice(3);
})

year.addEventListener('input', function () {
    expiracySpan.innerText = expiracySpan.innerText.slice(0, 2) + "/" + year.value
})



function validateEmpty(input, errorMsg) {
    if (input.validity.valueMissing) {
        errorMsg.innerText = "Can't be blank";
        errorMsg.classList.add('visible');
        input.classList.add('input-error');
    }
    else {
        errorMsg.innerText = "";
        errorMsg.classList.remove('visible');
        input.classList.remove('input-error');
    }
}

function lengthValidation(input, errorMsg, minimum) {
    if (cardNumber.value.length < minimum && cardNumber.value.length === 0) {
        errorMsg.innerText = "Complete all the digits";
        errorMsg.classList.add('visible');
        cardNumber.classList.add('input-error');

    } else {
        errorMsg.innerText = "";
        errorMsg.classList.remove('visible');
        cardNumber.classList.remove('input-error');
    }
}
form.addEventListener('submit', function (e) {
    // emptyness validation
    for (let input of inputs) {
        let errorMsg = input.parentElement.lastElementChild;
        validateEmpty(input, errorMsg);
        // length validation
        if (!errorMsg.classList.contains('visible')) {
            switch (input.id) {
                case 'card-number':
                    lengthValidation(input, errorMsg, 19);
                    break;
                case 'cvc':
                    lengthValidation(input, errorMsg, 3);
                    break;
            }
        }
        // digits validation
        if (!errorMsg.classList.contains('visible')) {
            if (input.validity.patternMismatch) {
                errorMsg.innerText = "Wrong format";
                errorMsg.classList.add('visible');
                input.classList.add('input-error');
            } else {
                errorMsg.innerText = "";
                errorMsg.classList.remove('visible');
                input.classList.remove('input-error');
            }
        }
        if(errorMsg.classList.contains('visible')){
            e.preventDefault();
        }


    }

    // card number validation






});



