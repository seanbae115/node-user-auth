$(document).ready(addClickHandlers);

function addClickHandlers() {
    $('#registerBtn').on('click', () => {
        register();
    });

    $('#signinBtn').on('click', () => {
        signIn();
    });
    $('#get-userBtn').on('click', () => {
        $.ajax({
            url: '/get-user',
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('token')
            },
            success: res => {
                console.log(res);
            }
        })
    })
}

function signIn() {
    const values = {
        email: $('#email-signin').val(), 
        password: $('#password-signin').val()
    }
    console.log(values);
    $.ajax({
        url: '/signin',
        method: 'POST',
        data: values,
        success: res => {
            console.log('Sign-in response: ', res)
            localStorage.setItem('token', res.token);
        }
    })
}

function register() {
    const values = {
        email: $('#email').val(), 
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        password: $('#password').val()
    }
    console.log(values);

    $.ajax({
        url: '/signup',
        method: 'POST',
        data: values,
        success: res => {
            console.log('Register response: ', res)
        }
    })
}