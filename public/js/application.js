$(document).ready(function () {
    let imSummitEmail;

    const team_leader = $('#team_leader');
    const team_name = $('#team_name');
    const phone = $('#phone');
    const email = $('#email');
    const year_course = $('#year_course');
    const university = $('#university');
    const terms = $('#terms');
    const submit = $('#submit');

    $.ajax({
        url: '/api/email',
        method: 'post',
        success: function (response) {
            imSummitEmail = response.email;
        }
    });

    $('#submit').click(function (event) {

        event.preventDefault();

        // Validate Form
        if (validateForm() || true) {
            // Send Email
            $.ajax({
                url: `http://formspree.io/${imSummitEmail}`,
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
                }
            });
        } else {

        }
    });

    function validateForm() {

    }

    function clearForm() {

    }

});