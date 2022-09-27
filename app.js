const inputName = document.querySelector('#cardholder-name');
const cardNumber = document.querySelector('#card-number');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const cvc = document.querySelector('#cvc');
const form = document.querySelector('form');
let inputs = document.querySelectorAll('input');
const cardNumberSpan = document.querySelector('#cardNumberSpan');
const userNameSpan = document.querySelector('#userNameSpan');
const expiracySpan = document.querySelector('#expiracySpan');

inputName.addEventListener('input',function(){
    userNameSpan.innerText = inputName.value;
})

cardNumber.addEventListener('input',function(){
    console.log('number')
    cardNumberSpan.innerText = cardNumber.value;
})

// month.addEventListener('input',function(){
//     userNameSpan.innerText = month.value;
// })

form.addEventListener('submit',function () {
    for (let input of inputs) {
        let errorMsg = input.parentElement.lastElementChild;
        if (input.validity.valueMissing) {
            errorMsg.innerText = "Can't be blank";
            errorMsg.classList.add('visible');
            input.classList.add('input-error');
            e.preventDefault();
        }
        else{
            errorMsg.innerText = "";
            errorMsg.classList.remove('visible');
        }
    }
});


