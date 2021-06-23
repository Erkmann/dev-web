var user = false

function formLoginExecSubmit() {
    if ($('#email').val().length > 0 && $('#password').val().length > 0) {
        validateFields()
        $('#formLogin').submit();
    }
    else {
        invalidateFields()
        toastr.error('Email e senha nao podem estar vazios!')
    }

}

function invalidateFields() {
    if (!$('#email').val().length > 0) {
        $('#emailInvalid').slideDown()
        $('#email').addClass('is-invalid')
    }
    else {
        $('#emailInvalid').slideUp()
        $('#email').removeClass('is-invalid')
    }

    if (!$('#password').val().length > 0) {

        $('#senhaInvalid').slideDown()
        $('#password').addClass('is-invalid')
    }
    else {
        $('#senhaInvalid').slideUp()
        $('#password').removeClass('is-invalid')
    }
}

function validateFields() {
    $('#emailInvalid').slideUp()
    $('#email').removeClass('is-invalid')
    $('#senhaInvalid').slideUp()
    $('#password').removeClass('is-invalid')
}

function changeNavLogged() {
    $('#userEmail').text(user.email)
    $('#userEmailItem').slideDown()

    $('#NavButtonText').text('Logout')
    $('#navButtonIcon').removeClass('bi-box-arrow-in-right')
    $('#navButtonIcon').addClass('bi-box-arrow-left')
}

function changeNavNotLogged() {
    $('#userEmail').text('')
    $('#userEmailItem').slideUp()

    $('#NavButtonText').text('Login')
    $('#navButtonIcon').addClass('bi-box-arrow-in-right')
    $('#navButtonIcon').removeClass('bi-box-arrow-left')
}

async function login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            toastr.success('Logado com Sucesso!');
            user = userCredential.user;
            changeNavLogged()
            $('#closeLogin').click()
        })
        .catch((error) => {
            toastr.error(error.message);
            user = false;
        });
}

function logoutIfLoggedIn() {
    if (user) {
        logout()
        return true;
    }
    return false;
}

async function logout() {
    await firebase.auth().signOut().then(() => {
        user = false;
        toastr.info('Deslogado!');
        changeNavNotLogged()
    }).catch((error) => {
        toastr.error(error.message);
    });
}

$(document).ready(function () {
    $('#emailInvalid').hide()
    $('#senhaInvalid').hide()
    $('#userEmailItem').hide()

    $("#formLogin").submit(function (e) {
        e.preventDefault()

        let email = $('#email').val();
        let senha = $('#password').val();

        login(email, senha)
    });

    $('#loginButton').click(function (event) {
        if (logoutIfLoggedIn()) {
            console.log('close meo')
            $('#closeLogin').click()
        }
    })
});