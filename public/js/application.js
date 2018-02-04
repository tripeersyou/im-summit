$(document).ready(function () {

    let imSummitEmail;

    $('.modal').modal();

    $('#form').hide();

    $('#showForm').click(() => {
        $('#reg').css('height', 'auto');
        $('#reg-before').hide();
        $('#form').fadeIn();
        clearForm();
        $('#team_name').focus();
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
            let registration = $('#form').serialize();
            // console.log(registration);
            $.ajax({
                url: `https://formspree.io/${imSummitEmail}`,
                method: 'post',
                data: registration,
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
                    $('#reg').css('height', '100vh');
                }
            });
        } else {
            $('#error_modal').modal('open');
        }
    });

    function validateForm() {
        let member_match = [];
        let members_year_match = [];
        let email_pattern = /\S+@(?:\w+\.)?\w+\.\w+/;
        let phone_pattern = /09[0-9]{9}/;
        let noWhitespace = /\S/;
        let team_members_name = document.getElementsByClassName('member_name');
        let members_year_course = document.getElementsByClassName('year_course');
        let team_leader_validation = $('#team_leader').val().match(noWhitespace);
        let team_name_validation = $('#team_name').val().match(noWhitespace);
        let phone_validation = $('#phone').val().match(phone_pattern);
        let email_validation = $('#email').val().match(email_pattern);
        let year_course_validation = $('#year_course').val().match(noWhitespace);
        let university_validation = $('#university').val().match(noWhitespace);

        for (const name of team_members_name) {
            if (name.value.match(noWhitespace) != null) {
                member_match.push(name);
            }        
        }

        for (const year_course of members_year_course) {
            if (year_course.value.match(noWhitespace) != null) {
                members_year_match.push(year_course);
            }
        }

        return email_validation != null && team_leader_validation != null && team_name_validation != null && year_course_validation != null && university_validation != null && phone_validation != null && $('#terms').prop('checked') && member_match.length >= 2 && members_year_match.length >= 2 && member_match.length === members_year_match.length;
    }

    function clearForm() {
        $('#team_leader').val('');
        $('#team_name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('#year_course').val('');
        $('#university').val('');
        $('#terms').val('');
        $('.year_course').val('');
        $('.member_name').val('');
        $('input[type=checkbox]').prop('checked', false);
    }
});
