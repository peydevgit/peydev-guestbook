

function NameValidate() {
    let testName = /^[A-z ]+$/;
    let username = document.getElementById('username');
    let submitbutton = document.getElementById("inputSubmit");

    if (testName.test(username.value)) {
        username.style.background = 'greenyellow';
        submitbutton.disabled = false;
        submitbutton.style.background = '#535b63'

    }
    else {
        username.style.background = 'lightcoral';
        submitbutton.disabled = true;
        submitbutton.style.background = 'red'
    }
}

