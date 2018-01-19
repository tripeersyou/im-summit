$(document).ready(function () {

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: 200
    });

    setInterval(() => {
        $('.carousel.carousel-slider').carousel('next');
    }, 3000);

    let imSummitEmail;

    const team_leader = $('#team_leader');
    const team_name = $('#team_name');
    const phone = $('#phone');
    const email = $('#email');
    const year_course = $('#year_course');
    const university = $('#university');
    const terms = $('#terms');

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