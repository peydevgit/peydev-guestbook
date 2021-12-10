// vi skapade en namn validator.. ifall de skriver in fel format så blir den röd eller grön ifall de rätt.. sedan blir submit button låst beroende på vilket.
function NameValidate() {
    let testName = /^[A-z ]+$/;
    let username = document.getElementById('username');
    let submitbutton = document.getElementById("inputSubmit");

    if (testName.test(username.value)) {
        username.style.background = 'greenyellow';
        submitbutton.disabled = false;
        submitbutton.style.background = '#535b63'

    } else {
        username.style.background = 'lightcoral';
        submitbutton.disabled = true;
        submitbutton.style.background = 'red'
    }
}