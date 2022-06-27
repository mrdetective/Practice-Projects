let string = "";

button = document.querySelectorAll('.button');
Array.from(button).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = eval(string);
            document.querySelector('input').value = string;
        } else if (e.target.innerHTML == 'C') {
            string = "";
            document.querySelector('input').value = string;
        } else if (e.target.innerHTML == 'M+') {
            string = string + '+';
        } else if (e.target.innerHTML == 'M-') {
            string = string + '-';
        } else if (e.target.innerHTML == '%') {
            string = '(' + string + '/100)*';
            document.querySelector('input').value = string;
        } else {
            console.log(e.target);
            string += e.target.innerHTML;
            document.querySelector('input').value = string;
        }

    });
})