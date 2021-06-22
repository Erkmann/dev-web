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

$(document).ready(function () {
    $('#emailInvalid').hide()
    $('#senhaInvalid').hide()

    $("#formLogin").submit(function (e) {
        e.preventDefault()

        let email = $('#email').val();
        let senha = $('#password').val();

        toastr.success(email)
        toastr.success(senha)
    });
});