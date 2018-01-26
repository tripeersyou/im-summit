$(document).ready(function () {

    let imSummitEmail;

    $('.modal').modal();

    $('#form').hide();

    $('#showForm').click(() => {
        $('#reg-before').hide();
        $('#form').fadeIn();
        clearForm();
        $('#team_leader').focus();
    });

    $.ajax({
        url: '/api/email',
        method: 'post',
        success: function (response) {
            imSummitEmail = response.email;
        }
    });

    $('input').keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    $('#submit').click(function (event) {

        event.preventDefault();

        // Validate Form
        if (validateForm()) {
            // Send Email
            $.ajax({
                url: `https://formspree.io/${imSummitEmail}`,
                method: 'post',
                data: $('#form').serialize(),
                dataType: 'json',
                sucess: function (response) {
                    console.log(response);
                }
            });

            // Store DB
            $.ajax({
                url: '/',
                method: 'post',
                data: $('#form').serialize(),
                success: function () {
                    clearForm();
                    $('#form').fadeOut();
                    $('#reg-before').fadeIn();
                    $('#success_modal').modal('open');
                }
            });
        } else {
            $('#error_modal').modal('open');
        }
    });

    function validateForm() {
        let email_pattern = /\S+@(?:\w+\.)?\w+\.\w+/;
        let phone_pattern = /09[0-9]{9}/;
        let noWhitespace = /\S/;
        let team_leader_validation = $('#team_leader').val().match(noWhitespace);
        let team_name_validation = $('#team_name').val().match(noWhitespace);
        let phone_validation = $('#phone').val().match(phone_pattern);
        let email_validation = $('#email').val().match(email_pattern);
        let year_course_validation = $('#year_course').val().match(noWhitespace);
        let university_validation = $('#university').val().match(noWhitespace);

        return email_validation != null && team_leader_validation != null && team_name_validation != null && year_course_validation != null && university_validation != null && phone_validation != null && $('#terms').prop('checked');
    }

    function clearForm() {
        $('#team_leader').val('');
        $('#team_name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('#year_course').val('');
        $('#university').val('');
        $('#terms').val('');
        $('input[type=checkbox]').prop('checked', false);
    }
});