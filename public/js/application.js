$(document).ready(function () {

    $('#form').hide();

    $('#showForm').click(() => {
        $('#reg-before').hide();
        $('#form').fadeIn();
    });

    const team_leader = $('#team_leader');
    const team_name = $('#team_name');
    const phone = $('#phone');
    const email = $('#email');
    const year_course = $('#year_course');
    const university = $('#university');
    const terms = $('#terms');

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        duration: 200
    });

    setInterval(() => {
        $('.carousel.carousel-slider').carousel('next');
    }, 3000);

    let imSummitEmail;

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
        let email_pattern = /\S+@(?:\w+\.)?\w+\.(?:com|edu)/
        let email_validation = email.value.match(pattern)
        let team_leader_validation
        return team_leader.value != /\S/ && team_name.value != /\S/ && phone.value != /\S/ && email_validation != null && year_course.value != /\S/ && university != /\S/ && terms.checked;

    }

    function clearForm() {
        team_leader.value = '';
        team_name.value = '';
        phone.value = '';
        email.value = '';
        year_course.value = '';
        university.value = '';
        terms.attr('checked',false);
    }
});