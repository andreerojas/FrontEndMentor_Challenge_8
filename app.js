const userName = document.querySelector('#cardholder-name');
const cardNumber = document.querySelector('#card-number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc-input');
const form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
const cardNumberSpan = document.querySelector('#cardNumberSpan');
const userNameSpan = document.querySelector('#userNameSpan');
const expiracySpan = document.querySelector('#expiracySpan');
const cvcSpan = document.querySelector('.cvcSpan');
const confirmation = document.querySelector('.confirmation');
const continueBtn = document.querySelector('#continue-btn');

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

cvc.addEventListener('input', function () {
    cvcSpan.innerText = cvc.value;
})
function showError(input, msg) {
    let errorMsg = input.parentElement.lastElementChild;
    errorMsg.innerText = msg;
    errorMsg.classList.add('visible');
    input.classList.add('input-error');
}

function hideError(input) {
    let errorMsg = input.parentElement.lastElementChild;
    errorMsg.innerText = "";
    errorMsg.classList.remove('visible');
    input.classList.remove('input-error');
}

function validateEmpty(input) {
    let ret = false;
    if (input.validity.valueMissing) {
        showError(input, "Can't be blank")
        ret = true;
    }
    else {
        hideError(input);
    }
    return ret;
}

function lengthValidation(input) {
    let length = input.value.length;
    let ret = false;
    let minimum = 0;
    if (input.id === 'card-number')
        minimum = 19;
    else if (input.id === 'cvc')
        minimum = 3;
    else
        minimum = 0;

    if (length < minimum && length === 0) {
        showError(input, "Complete all the digits");
        ret = true;
    } else {
        hideError(input);
    }
    return ret;
}

function formatValidation(input) {
    let ret = false;
    if (input.validity.patternMismatch) {
        showError(input, "Wrong format");
        ret = true;
    } else {
        hideError(input);
    }
    return ret;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    // emptyness validation
    for (let input of inputs) {
        let error = false;
        error = validateEmpty(input);
        // length validation
        if (!error) {
            error = lengthValidation(input)
        }
        // digits validation
        if (!error) {
            error = formatValidation(input);
        }
        if (!error) {
            form.classList.add('hidden');
            confirmation.classList.add('visible');
        }
    }
});

continueBtn.addEventListener('click', function () {
    for (let input of inputs) {
        input.value = "";
    }
    cardNumberSpan.innerText = "0000 0000 0000 0000";
    userNameSpan.innerText = "Jane Appleseed";
    expiracySpan.innerText = "MM/YY";
    cvcSpan.innerText = "000";
    form.classList.remove('hidden');
    confirmation.classList.remove('visible');
    form.classList.remove('hidden');
    confirmation.classList.remove('visible');
})


