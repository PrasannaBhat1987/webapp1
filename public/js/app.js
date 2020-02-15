console.log('Client side javascript loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    var val = search.value;
    message1.textContent = 'Loading...';
    message2.textContent = '';
    //console.log(val);
    fetch('/weather?address=' + val).then( response => {
        response.json().then(data => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
            console.log(data)
        });
    });
    
});